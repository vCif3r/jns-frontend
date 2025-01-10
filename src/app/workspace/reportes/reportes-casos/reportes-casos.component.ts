import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CasoService } from '../../../core/services/caso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Caso } from '../../../core/models/caso';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes-casos',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './reportes-casos.component.html',
  styleUrl: './reportes-casos.component.css'
})
export class ReportesCasosComponent {
  private casoService = inject(CasoService);

  displayedColumns: string[] = [
    'id',
    'fecha',
    'codigo',
    'cliente',
    'abogado',
    'estado',
  ]; //  columnas
  originalData: Caso[] = [];

  dataSource = new MatTableDataSource<Caso>(); // Definir el origen de datos
  @ViewChild(MatPaginator) paginatorRptCaso!: MatPaginator;
  @ViewChild(MatSort) sortRptCaso!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorRptCaso;
    this.dataSource.sort = this.sortRptCaso;
  }

  ngOnInit(): void {
    this.cargarCasos();
  }

  cargarCasos() {
    this.casoService.findAll().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.originalData = data;
      }
    );
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
   codigo: string = '';

   applyCustomFilters(): void {
    let filteredData = this.originalData; // Filtramos sobre los datos originales

    // Filtro por rango de fechas (fechaInicio y fechaFin)
    if (this.fechaInicio || this.fechaFin) {
      const startDate = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const endDate = this.fechaFin ? new Date(this.fechaFin) : null;

      // Asegúrate de resetear la hora de las fechas (solo comparar año, mes, día)
      const startDateOnly = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null;
      const endDateOnly = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null;

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

    // Filtro por código (si está presente)
    if (this.codigo) {
      filteredData = filteredData.filter((element) =>
        element.codigo.toLowerCase().includes(this.codigo.toLowerCase())
      );
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
    (document.getElementById('codigo') as HTMLInputElement).value = '';
  
    // Limpiar el filtro de la tabla (restablecer la búsqueda de texto)
    this.dataSource.filter = '';
  
    // Cargar los datos sin aplicar ningún filtro
    this.cargarCasos();
  }
}
