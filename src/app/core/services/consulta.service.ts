import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url = 'http://localhost:3000/consultas'

  // admin
  private consultasPendientesSubject = new BehaviorSubject<Consulta[]>([]);
  consultasPendientes$ = this.consultasPendientesSubject.asObservable();

  // abogado
  private consultasAbogadoSubject = new BehaviorSubject<Consulta[]>([]);
  consultasAbogado$ = this.consultasAbogadoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarConsultasPendientes();
  }

  save(consulta: any) {
    return this.http.post<any>(this.url, consulta)
  }

  findById(id: number) {
    return this.http.get<Consulta>(`${this.url}/${id}`)
  }

  // lista consultas pendientes para admin
  getConsultasPendientes(): Observable<Consulta[]> {
    return this.consultasPendientes$;
  }

  private cargarConsultasPendientes() {
    this.http.get<Consulta[]>(`${this.url}/pendientes`)
      .subscribe((data) => this.consultasPendientesSubject.next(data));
  }

  cancelarConsultaByAbogado(idConsulta: any) {
    return this.http.patch(`${this.url}/cancelar/${idConsulta}`, {}).pipe(
      tap(() => {
        const currentList = this.consultasPendientesSubject.value;
        this.consultasPendientesSubject.next(currentList.filter((a) => a.id !== idConsulta));
      })
    )
  }

  asignarAbogado(idConsulta: any, idAbogado: any) {
    const body = {
      idConsulta: idConsulta,
      idAbogado: idAbogado
    };
    return this.http.patch(`${this.url}/asignar`, body).pipe(
      tap(() => {
        const currentList = this.consultasPendientesSubject.value;
        this.consultasPendientesSubject.next(currentList.filter((a) => a.id !== idConsulta));
      })
    )
  }

  

  // abogados
  // Método para obtener todas las consultas asignadas para un abogado
  cargarConsultasAbogado(idAbogado: any){
    return this.http.get<Consulta[]>(`${this.url}/abogado/${idAbogado}`).subscribe(
      (data) => this.consultasAbogadoSubject.next(data),
      (err) => console.error('Error al cargar consultas del abogado:', err)
    )
  }

  rechazarConsulta(idConsulta: any) {
    return this.http.patch(`${this.url}/rechazar/${idConsulta}`, {}).pipe(
      tap(() => {
        const currentList = this.consultasAbogadoSubject.value;
        this.consultasAbogadoSubject.next(currentList.filter((a) => a.id!== idConsulta));
      })
    )
  }

  

}
