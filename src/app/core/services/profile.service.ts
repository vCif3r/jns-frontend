import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Role } from '../models/role';

interface Profile {
  id: string;
  nombre: string;
  apellido: string;
  genero: string;
  estado_civil?: string;
  especialidad?: string;
  direccion: string;
  pais: string;
  email?: string;
  foto?: string;
  telefono: string;
  role: Role;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _http = inject(HttpClient);
  private url = environment.API_URL;


  // Creamos un BehaviorSubject para almacenar el perfil
  private profileSubject = new BehaviorSubject<Profile | null>(null);

  // Obtenemos el observable del perfil actual
  get profile$(): Observable<Profile | null> {
    return this.profileSubject.asObservable();
  }

  constructor() { }

  getProfileUser(userId: any): Observable<Profile>{
    return this._http.get<Profile>(`${this.url}/users/${userId}`).pipe(
      tap((profile) => {
        // Al obtener el perfil, lo emitimos al BehaviorSubject
        this.profileSubject.next(profile);
      })
    );
  }

  updateUser(userId: any, updateUser: any): Observable<Profile> {
    return this._http.patch<Profile>(`${this.url}/users/${userId}`, updateUser).pipe(
      tap((updatedProfile) => {
        // Al actualizar el perfil, lo emitimos al BehaviorSubject
        this.profileSubject.next(updatedProfile);
      })
    );
  }
}
