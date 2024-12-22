import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TipoServicio } from '../models/tipoServicio';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {
  private url = 'http://localhost:3000/tipos-servicios'; 

  private tiposserviciosSubject = new BehaviorSubject<TipoServicio[]>([]);
  tiposservicios$ = this.tiposserviciosSubject.asObservable();


  constructor(private http: HttpClient) {
    this.loadServicios();
  }

  private loadServicios() {
    this.http.get<TipoServicio[]>(this.url).subscribe(
      (tiposervicio) => this.tiposserviciosSubject.next(tiposervicio),
      (err) => console.error('Error al cargar tipos servicios:', err)
    );
  }

  // Método para obtener los servicios de forma reactiva
  getTiposServicios(): Observable<TipoServicio[]> {
    return this.tiposservicios$;
  }

  save(tiposervicio: Omit<TipoServicio, 'id'>): Observable<TipoServicio> {
    return this.http
      .post<TipoServicio>(`${this.url}`, tiposervicio)
      .pipe(
        tap((newService) => {
          const current = this.tiposserviciosSubject.value;
          this.tiposserviciosSubject.next([...current, newService]);
        })
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        const current = this.tiposserviciosSubject.value;
        this.tiposserviciosSubject.next(current.filter((s) => s.id !== id));
      })
    );
  }

  update(id: number, updateService: TipoServicio): Observable<TipoServicio> {
    return this.http.patch<TipoServicio>(`${this.url}/${id}`, updateService).pipe(
      tap((tipo) => {
        const currents = this.tiposserviciosSubject.value;
        const index = currents.findIndex((s) => s.id === id);
        if (index !== -1) {
          currents[index] = tipo;
          this.tiposserviciosSubject.next([...currents]);
        }
      })
    );
  }

  getTipoServicio(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }


}
