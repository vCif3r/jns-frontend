import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      // Si está autenticado, redirigir a la página de dashboard o la página principal
      this.router.navigate(['/']);
      return false; // No permite el acceso a la ruta de login
    } else {
      // Si no está autenticado, permite acceder a la ruta de login
      return true;
    }
  }
}
