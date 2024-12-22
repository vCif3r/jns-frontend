import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/auth"


  constructor(private _http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this._http.post<any>(`${this.url}/login/`, credentials).pipe(
      tap((response) => this.setSession(response.token)),
      catchError((error) => {
        console.error('Login error', error);
        throw error;
      })
    )
  }

  private setSession(token: string): void {
    localStorage.setItem('token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.rol;
    }
    return null;
  }

  getID(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  }

  getEmailUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.email;
    }
    return null;
  }

  getnameUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token)
      return decodedToken.nombre
    }
    return null;
  }




  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
