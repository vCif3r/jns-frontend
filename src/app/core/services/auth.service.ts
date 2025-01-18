import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _storage = inject(StorageService)
  private _http = inject(HttpClient)
  private router = inject(Router)

  login(email: string, password: string ): Observable<any> {
    return this._http.post<any>(`${environment.API_URL}/auth/login/`, {email, password}).pipe(
      tap((response) => {
        this._storage.set('session', JSON.stringify(response));
      }),
      catchError((error) => {
        throw error;
      })
    )
  }

  getToken(): string | null {
    return localStorage.getItem('session');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): any {
    const token = localStorage.getItem('session');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.rol;
    }
    return null;
  }

  getID(): any {
    const token = localStorage.getItem('session');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  }

  getEmailUser(): any {
    const token = localStorage.getItem('session');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.email;
    }
    return null;
  }

  getnameUser(): any {
    const token = localStorage.getItem('session');
    if (token) {
      const decodedToken: any = jwtDecode(token)
      return decodedToken.nombre
    }
    return null
  }

  logout(): void {
    localStorage.removeItem('session')
    this.router.navigateByUrl('/login')
  }
}
