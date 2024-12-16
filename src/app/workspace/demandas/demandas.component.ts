import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DemandaService } from '../../core/services/demanda.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';

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
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './demandas.component.html',
  styleUrl: './demandas.component.css',
})
export class DemandasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'estado','acciones']; // Definir las columnas
  dataSource = new MatTableDataSource<any>(); // Definir el origen de datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarDemandaComponent);
    dialogRef.afterClosed().subscribe();
  }

  role:any;

  constructor(
    private router: Router,
    private demandaService: DemandaService,
    private _authService: AuthService 
  ) {}

  

  ngOnInit(): void {
    this.demandaService.findAll().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.role = this._authService.getRole(); 
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

  verDetalles(demandaId: number): void {
    // Redirigir a la ruta de detalles con el id de la demanda
    this.router.navigate([`/workspace/demandas/${demandaId}`]);
  }
}
