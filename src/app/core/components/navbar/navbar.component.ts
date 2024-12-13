import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DropdownUserComponent } from '../dropdown-user/dropdown-user.component';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, CommonModule, RouterLink, RouterLinkActive, DropdownUserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSticky: boolean = false;
  isAutenticated: boolean = false;
  

  constructor(private _authService: AuthService) {
    this.isAutenticated = _authService.isAuthenticated();
  }

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

  
}
