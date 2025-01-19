import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../core/services/role.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../core/models/role';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from '../users/form-user/form-user.component';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { FormRoleComponent } from './form-role/form-role.component';

@Component({
  selector: 'app-roles',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit, AfterViewInit {
loading = true;
  private roleService = inject(RoleService)
  // TABLE
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'acciones',
  ]; //  columnas
  dataSourceRoles = new MatTableDataSource<Role>(); // Definir el origen de datos
  @ViewChild(MatPaginator) paginatorRole!: MatPaginator;
  @ViewChild(MatSort) sortRole!: MatSort;


  ngAfterViewInit() {
    this.dataSourceRoles.paginator = this.paginatorRole;
    this.dataSourceRoles.sort = this.sortRole;
  }

  ngOnInit(): void {
    this.cargarAbogados();
  }

  cargarAbogados() {
    this.roleService.findAll().subscribe(
      (data) => {
        this.dataSourceRoles.data = data;
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRoles.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSourceRoles.paginator) {
      this.dataSourceRoles.paginator.firstPage();
    }
  }
  dialog = inject(MatDialog)
  openDialog(user?: any){
    const dialogRef = this.dialog.open(FormRoleComponent, {
      exitAnimationDuration: 500,
      enterAnimationDuration: 500,
      data: {data: user}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result && result.success){
        this.dialog.closeAll();
         // Actualizar la lista  
        this.ngOnInit()
      }
    })
  }
}
