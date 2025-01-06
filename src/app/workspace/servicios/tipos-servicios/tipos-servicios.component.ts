import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoServicioService } from '../../../core/services/tipoServicio.service';
import { TipoServicio } from '../../../core/models/tipoServicio';
import { FormTipoServicioComponent } from '../form-tipo-servicio/form-tipo-servicio.component';
import { DialogDeleteTipoComponent } from '../dialog-delete-tipo/dialog-delete-tipo.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tipos-servicios',
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    MatSortModule,
  ],
  templateUrl: './tipos-servicios.component.html',
  styleUrl: './tipos-servicios.component.css'
})
export class TiposServiciosComponent implements AfterViewInit {
  displayedColumnsTiposServicios: string[] = ['id', 'nombre', 'estado', 'acciones'];
  dataSourceTiposServicios = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatorTipos!: MatPaginator;
  @ViewChild(MatSort) sortTipos!: MatSort;

  readonly dialog = inject(MatDialog);

  constructor(
    private tipoServicioService: TipoServicioService,
  ) { }

  ngAfterViewInit(): void {
    this.dataSourceTiposServicios.paginator = this.paginatorTipos;
    this.dataSourceTiposServicios.sort = this.sortTipos;
  }

  ngOnInit(): void {
    this.cargarTiposServicios();
  }

  cargarTiposServicios() {
    this.tipoServicioService.getTiposServicios().subscribe(
      (tiposervicios) => {
        this.dataSourceTiposServicios.data = tiposervicios;
      }
    )
  }

  openDialogTipoServicio(tipo?: TipoServicio) {
    this.dialog.open(FormTipoServicioComponent, {
      data: { tipo: tipo }
    });
  }

  applyFilterTiposServicios(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTiposServicios.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSourceTiposServicios.paginator) {
      this.dataSourceTiposServicios.paginator.firstPage();
    }
  }

  openDialogDeleteTipoServicio(id: any) {
    this.dialog.open(DialogDeleteTipoComponent, {
      data: { id: id }
    });
  }
}
