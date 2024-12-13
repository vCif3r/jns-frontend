import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/auth"
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private _http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this._http.post<any>(`${this.url}/login/`, credentials)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp > Date.now() / 1000;
  }

  getToken(){
    return localStorage.getItem('token')
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
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

  getEmailUser():any{
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.email;
    }
    return null;
  }

  getFullnameUser():any{
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken:any = jwtDecode(token)
      return decodedToken.nombre + ' ' + decodedToken.apellido
    }
    return null;
  }



  
  logout(){
    localStorage.removeItem('token');
    window.location.reload()
  }
}
