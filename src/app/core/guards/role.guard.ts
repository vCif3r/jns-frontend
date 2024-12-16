import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const userRole = this.authService.getRole(); // Role del usuario (de tu método getRole)
    //const expectedRole = route.data['role']; // Role esperado
    const requiredRoles = route.data['roles']; 

    if (userRole && requiredRoles.includes(userRole)) {
      return true; // Permite acceso
    } else {
      this.router.navigate(['/']);
     
      return false;
    }
  }
}