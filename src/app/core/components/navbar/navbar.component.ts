import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DropdownUserComponent } from '../dropdown-user/dropdown-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BuscarCasoComponent } from '../buscar-caso/buscar-caso.component';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, CommonModule, RouterLink, RouterLinkActive,DropdownUserComponent, MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSticky: boolean = false;
  
  authService = inject(AuthService) 
  
  // Usamos HostListener para escuchar el evento de scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verificamos la posición de desplazamiento
    if (window.scrollY > 0) {
      this.isSticky = true; // Agregar la clase cuando se ha desplazado
    } else {
      this.isSticky = false; // Remover la clase cuando estamos en la parte superior
    }
  }

  readonly dialog = inject(MatDialog);
  openDialog(){
    this.dialog.open(BuscarCasoComponent,{
      maxWidth: '100vw',
      minWidth: '65vw'
    })
  }

  
}
