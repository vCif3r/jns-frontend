import { Component, inject, AfterViewInit, ViewChild } from '@angular/core';
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
import { MatTabsModule } from '@angular/material/tabs';
import { DialogDeleteServiceComponent } from './dialog-delete-service/dialog-delete-service.component';
import { TiposServiciosComponent } from './tipos-servicios/tipos-servicios.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatTabsModule,
    TiposServiciosComponent,
    MatSlideToggleModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent implements AfterViewInit {
  displayedColumnsServicios: string[] = ['id', 'nombre', 'categoria', 'estado','publicado', 'acciones'];
  dataSourceServicios = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginatorServices!: MatPaginator;
  @ViewChild(MatSort) sortServices!: MatSort;

  readonly dialog = inject(MatDialog);

  constructor(
    private snackbar: MatSnackBar,
    private servicioService: ServicioService,
  ) { }

  ngAfterViewInit() {
    this.dataSourceServicios.paginator = this.paginatorServices;
    this.dataSourceServicios.sort = this.sortServices;
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe(
      (servicios) => {
        this.dataSourceServicios.data = servicios;
      }
    )
  }


  applyFilterServicios(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceServicios.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSourceServicios.paginator) {
      this.dataSourceServicios.paginator.firstPage();
    }
  }

  openDialogServicio(servicio?: Servicio) {
    this.dialog.open(FormServicioComponent, {
      data: { servicio: servicio }
    });
  }
  

  openDialogDeleteServicio(id: any) {
    this.dialog.open(DialogDeleteServiceComponent, {
      data: { id: id }
    });
  }

  onPublicadoChange(element: any): void {
    this.servicioService.actualizarPublicado(element.id, element.publicado).subscribe({
      next: (response) => {
        this.snackbar.open('Actualizado con éxito', 'Cerrar', {
          duration: 1000,
        });
      },
      error: (error) => {
        this.snackbar.open(`${error.error.message}`, 'Cerrar', {
          duration: 5000,
        });
      }
    });
  }
}