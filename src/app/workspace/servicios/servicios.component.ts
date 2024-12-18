import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ServicioService } from '../../core/services/servicio.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormServicioComponent } from './form-servicio/form-servicio.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Servicio } from '../../core/models/servicio';

@Component({
  selector: 'app-servicios',
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    RouterLink,
    MatSortModule,
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})export class ServiciosComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'categoria',
    'estado',
    'fecha_creacion',
    'acciones',
  ]; // Definir las columnas
  dataSource = new MatTableDataSource<any>(); // Definir el origen de datos
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // dialog agregar abogado
  readonly dialog = inject(MatDialog);

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.subscribeToServicios(); // Suscribirse a los datos reactivos
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(servicio?: Servicio) {
    const dialogRef = this.dialog.open(FormServicioComponent, {
      data: { servicio: servicio}
      
    });

    console.log('Servicio agregado:', servicio);

    // Detectar cuando el modal se cierre y recargar los datos si es necesario
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Servicio agregado:', result);
      }
    });
  }

  // Suscribirse a la lista reactiva de servicios
  subscribeToServicios(): void {
    this.servicioService.getServicios().subscribe((servicios) => {
      this.dataSource.data = servicios; // Actualizar la tabla
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
