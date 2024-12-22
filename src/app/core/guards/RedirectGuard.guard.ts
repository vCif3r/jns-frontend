import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.authService.getRole(); // Obtener el rol del usuario
    
    // Determinar la ruta a la que se debe redirigir
    let redirectPath: string;

    if (userRole === 'Admin') {
      redirectPath = '/workspace/dashboard';
    } else if (userRole === 'Cliente') {
      redirectPath = '/workspace/casos';
    } else if (userRole === 'Abogado') {
      redirectPath = '/workspace/abogados';
    } else {
      redirectPath = '/workspace/dashboard'; // Ruta por defecto
    }

    // Verificar si ya estamos en la ruta de destino
    if (state.url === redirectPath) {
      return true; // Si estamos en la ruta correcta, permitir el acceso
    }

    // Si no estamos en la ruta correcta, redirigir
    this.router.navigate([redirectPath]);
    return false; // Impedir que se acceda a la ruta 'workspace' directamente
  }
}
