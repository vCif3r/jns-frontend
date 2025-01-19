import { Component, inject, ViewChild } from '@angular/core';
import { Consulta } from '../../../core/models/consulta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ConsultaService } from '../../../core/services/consulta.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoServicio } from '../../../core/models/tipoServicio';
import { TipoServicioService } from '../../../core/services/tipoServicio.service';

@Component({
  selector: 'app-reportes-consultas',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './reportes-consultas.component.html',
  styleUrl: './reportes-consultas.component.css',
})
export class ReportesConsultasComponent {
  private consultaService = inject(ConsultaService);
  private tipServService = inject(TipoServicioService);

  displayedColumns: string[] = [
    'id',
    'fecha',
    'tiposervicio',
    'cliente',
    'estado',
  ]; //  columnas
  originalData: Consulta[] = [];

  dataSource = new MatTableDataSource<Consulta>(); // Definir el origen de datos
  @ViewChild(MatPaginator) paginatorRptConsulta!: MatPaginator;
  @ViewChild(MatSort) sortRptConsulta!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorRptConsulta;
    this.dataSource.sort = this.sortRptConsulta;
  }

  ngOnInit(): void {
    this.cargarConsultas();
    this.cargarTiposServicios();
  }

  cargarConsultas() {
    this.consultaService.findAll().subscribe((data) => {
      this.dataSource.data = data;
      this.originalData = data;
    });
  }

  tpServicios: TipoServicio[] = []
  cargarTiposServicios(){
    this.tipServService.findAll().subscribe((data)=>{
      this.tpServicios = data
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Variables para los filtros
  fechaInicio: string | null = null;
  fechaFin: string | null = null;
  servicio: string | null = null;

  applyCustomFilters(): void {
    let filteredData = this.originalData; // Filtramos sobre los datos originales

    // Filtro por rango de fechas (fechaInicio y fechaFin)
    if (this.fechaInicio || this.fechaFin) {
      const startDate = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const endDate = this.fechaFin ? new Date(this.fechaFin) : null;

      // Asegúrate de resetear la hora de las fechas (solo comparar año, mes, día)
      const startDateOnly = startDate
        ? new Date(startDate.setHours(0, 0, 0, 0))
        : null;
      const endDateOnly = endDate
        ? new Date(endDate.setHours(23, 59, 59, 999))
        : null;

      filteredData = filteredData.filter((element) => {
        const createdAt = new Date(element.createdAt); // Asumimos que createdAt está en formato ISO

        // Resetear la hora de la fecha creada (solo comparar año, mes, día)
        const createdAtOnly = new Date(createdAt.setHours(0, 0, 0, 0));

        let dateValid = true;

        // Filtrar por fecha de inicio
        if (startDateOnly && createdAtOnly < startDateOnly) {
          dateValid = false;
        }

        // Filtrar por fecha de fin
        if (endDateOnly && createdAtOnly > endDateOnly) {
          dateValid = false;
        }

        return dateValid;
      });
    }
    if (this.servicio) {
      filteredData = filteredData.filter((element) => {
        return element.servicio.nombre.toLowerCase().includes(this.servicio!.toLowerCase());
      });
    }

    // Actualizamos la dataSource con los datos filtrados
    this.dataSource.data = filteredData;

    // Si hay algún filtro, activa la paginación
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Función para limpiar los filtros
  clearFilters(): void {
    // Limpiar los campos de los filtros
    (document.getElementById('fecha-inicio') as HTMLInputElement).value = '';
    (document.getElementById('fecha-fin') as HTMLInputElement).value = '';
    (document.getElementById('servicio') as HTMLSelectElement).value = '';
    this.dataSource.filter = '';

    this.cargarConsultas();
  }

  getStyles(estado: string) {
    switch (estado) {
      case 'cancelado':
        return ['text-bg-danger'];  // Clase para cuando el estado es "Activo"
      case 'aprobado':
        return ['text-bg-success'];   // Clase para cuando el estado es "Inactivo"
      case 'revision':
        return ['text-bg-warning'];  // Clase para cuando el estado es "Pendiente"
      default:
        return ['text-bg-primary']; // Clase predeterminada
    }
  }
}
