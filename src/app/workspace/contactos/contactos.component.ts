import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContactoService } from '../../core/services/contacto.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactoDetallesComponent } from './contacto-detalles/contacto-detalles.component';

@Component({
  selector: 'app-contactos',
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
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css',
})
export class ContactosComponent implements AfterViewInit {
  displayedColumnsContactos: string[] = [
    'id',
    'nombreCompleto',
    'email',
    'tema',
    'acciones',
  ];
  dataSourceContactos = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginatorContactos!: MatPaginator;
  @ViewChild(MatSort) sortContactos!: MatSort;

  private contactoService = inject(ContactoService)

  ngAfterViewInit(): void {
    this.dataSourceContactos.paginator = this.paginatorContactos;
    this.dataSourceContactos.sort = this.sortContactos;
  }

  ngOnInit(): void {
    this.cargarTiposServicios();
  }

  cargarTiposServicios() {
    this.contactoService.findAll().subscribe((tiposervicios) => {
      this.dataSourceContactos.data = tiposervicios;
    });
  }

  applyFilterTiposContactos(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContactos.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSourceContactos.paginator) {
      this.dataSourceContactos.paginator.firstPage();
    }
  }

  readonly dialog = inject(MatDialog);
  openDialog(id: any){
    this.dialog.open(ContactoDetallesComponent,{
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      data: {id : id},
      minWidth: '60vw',
      maxWidth: '90vw'
    }
    )
  }
}
