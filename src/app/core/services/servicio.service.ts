import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url = 'http://localhost:3000/servicios'; // URL para obtener la lista de servicios

  private serviciosSubject = new BehaviorSubject<Servicio[]>([]);
  servicios$ = this.serviciosSubject.asObservable();


  constructor(private http: HttpClient) {
    this.loadServicios();
  }

  private loadServicios() {
    this.http.get<Servicio[]>(this.url).subscribe(
      (servicios) => this.serviciosSubject.next(servicios),
      (err) => console.error('Error al cargar servicios:', err)
    );
  }

  // Método para obtener los servicios de forma reactiva
  getServicios(): Observable<Servicio[]> {
    return this.servicios$;
  }

  save(servicio: Omit<Servicio, 'id'>): Observable<Servicio> {
    return this.http
      .post<Servicio>(`${this.url}`, servicio)
      .pipe(
        tap((newService) => {
          const current = this.serviciosSubject.value;
          this.serviciosSubject.next([...current, newService]);
        })
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        const current = this.serviciosSubject.value;
        this.serviciosSubject.next(current.filter((s) => s.id !== id));
      })
    );
  }

  update(id: number, updateService: Servicio): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.url}/${id}`, updateService).pipe(
      tap((cliente) => {
        const currents = this.serviciosSubject.value;
        const index = currents.findIndex((c) => c.id === id);
        if (index !== -1) {
          currents[index] = cliente;
          this.serviciosSubject.next([...currents]);
        }
      })
    );
  }

  getServicio(id: string) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getServicioPublicado(id: any) {
    return this.http.get<any>(`${this.url}/publicado/${id}`);
  }


  findAllPublicados(){
    return this.http.get<Servicio[]>(`${this.url}/publicados`);
  }


  actualizarPublicado(id: number, publicado: boolean) {
    return this.http.put(`${this.url}/publicado/${id}`, { publicado }).pipe(
      catchError(error => {
        // Aquí puedes manejar errores globales
        console.error('Error en la actualización:', error);
        return throwError(error); // Re-throw para que el error llegue al componente
      })
    );
  }
}
