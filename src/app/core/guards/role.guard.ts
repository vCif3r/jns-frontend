import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['role']; // Role esperado
    const userRole = this.authService.getRole(); // Role del usuario (de tu método getRole)

    if (userRole === expectedRole) {
      return true; // Permite acceso
    } else {
      // Redirige si no tiene permiso
      this.router.navigate(['/login']);
      return false;
    }
  }
}