import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url = 'http://localhost:3000/servicios'; // URL para obtener la lista de servicios
  private serviciosSubject = new BehaviorSubject<any[]>([]); 
  
  constructor(private http: HttpClient) {
    this.loadServicios();
  }

  findAll(){
    return this.http.get<Servicio[]>(this.url);
  }

  private loadServicios() {
    this.findAll().subscribe(
      (servicios) => this.serviciosSubject.next(servicios),
      (err) => console.error('Error al cargar servicios:', err)
    );
  }

  // Método para obtener los servicios de forma reactiva
  getServicios(): Observable<Servicio[]> {
    return this.serviciosSubject.asObservable();
  }

  save(servicioDTO: any): Observable<Servicio> {
    return this.http.post<Servicio>(this.url, servicioDTO).pipe(
      tap((nuevoServicio) => {
        // Actualizar la lista en el BehaviorSubject
        const serviciosActuales = this.serviciosSubject.value;
        this.serviciosSubject.next([...serviciosActuales, nuevoServicio]);
      })
    );
  }
  
  getServicio(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
  
  update(id: string, servicio: Servicio)  {
    return this.http.patch(`${this.url}/${id}`, servicio)
  }


}
