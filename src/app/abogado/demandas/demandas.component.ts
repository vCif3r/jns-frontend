import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DemandaService } from '../../core/services/demanda.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AgregarDemandaComponent } from './agregar-demanda/agregar-demanda.component';

@Component({
  selector: 'app-demandas',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './demandas.component.html',
  styleUrl: './demandas.component.css',
})
export class DemandasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'estado']; // Definir las columnas
  dataSource = new MatTableDataSource<any>(); // Definir el origen de datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarDemandaComponent);

    dialogRef.afterClosed().subscribe();
  }

  constructor(private demandaService: DemandaService) {}

  ngOnInit(): void {
    this.demandaService.findAll().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
