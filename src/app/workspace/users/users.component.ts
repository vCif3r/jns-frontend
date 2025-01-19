import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RolesComponent } from '../roles/roles.component';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'app-users',
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    RolesComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  loading = true;
  private userService = inject(UserService);
  // TABLE
  displayedColumns: string[] = ['id', 'nombre', 'email', 'role', 'acciones']; //  columnas
  dataSourceUsers = new MatTableDataSource<User>(); // Definir el origen de datos
  @ViewChild(MatPaginator) paginatorUsers!: MatPaginator;
  @ViewChild(MatSort) sortUsers!: MatSort;

  ngAfterViewInit() {
    this.dataSourceUsers.paginator = this.paginatorUsers;
    this.dataSourceUsers.sort = this.sortUsers;
  }

  ngOnInit(): void {
    this.cargarAbogados();
  }

  cargarAbogados() {
    this.userService.findAll().subscribe((data) => {
      this.dataSourceUsers.data = data;
      this.loading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSourceUsers.paginator) {
      this.dataSourceUsers.paginator.firstPage();
    }
  }

  dialog = inject(MatDialog);
  openDialog(user?: any) {
    console.log(user)
    const dialogRef = this.dialog.open(FormUserComponent, {
      exitAnimationDuration: 500,
      enterAnimationDuration: 500,
      data: { data: user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        this.dialog.closeAll();
        // Actualizar la lista
        this.ngOnInit();
      }
    });
  }
}
