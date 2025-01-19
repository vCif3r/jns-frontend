import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AreaLegalService } from '../../core/services/area-legal.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormAreaComponent } from './form-area/form-area.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-areas-legales',
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './areas-legales.component.html',
  styleUrl: './areas-legales.component.css'
})
export class AreasLegalesComponent implements OnInit, AfterViewInit {
  private areaService = inject(AreaLegalService)

  displayedColumnsAreas: string[] = ['id', 'nombre', 'fecha', 'acciones'];
  dataSourceAreas = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginatorArea!: MatPaginator;
  @ViewChild(MatSort) sortArea!: MatSort;

  ngOnInit(): void {
    this.cargarDatos()
  }

  ngAfterViewInit() {
    this.dataSourceAreas.paginator = this.paginatorArea;
    this.dataSourceAreas.sort = this.sortArea;
  }

  cargarDatos() {
    this.areaService.findAll().subscribe((data) => this.dataSourceAreas.data = data)
  }

  applyFilterServicios(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAreas.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAreas.paginator) {
      this.dataSourceAreas.paginator.firstPage();
    }
  }

  readonly dialog = inject(MatDialog)
  openDialog(area?: any){
    const dialogRef = this.dialog.open(FormAreaComponent, {
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      data: { data: area }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.dialog.closeAll();
        this.ngOnInit()
      }
    });
  }
}
