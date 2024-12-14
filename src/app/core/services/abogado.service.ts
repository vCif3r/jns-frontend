import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Abogado } from '../models/abogado';

@Injectable({
  providedIn: 'root'
})
export class AbogadoService {

  private urlRegister = 'http://localhost:3000/auth' // url solo para registrar abogados
  private url = 'http://localhost:3000/abogados'; // URL para obtener la lista de abogados


  private abogadosSubject = new BehaviorSubject<Abogado[]>([]);
  abogados$ = this.abogadosSubject.asObservable();

  constructor(private http: HttpClient) { }

  findAll(): Observable<Abogado[]> {
    return this.http.get<Abogado[]>(this.url).pipe(
      // Actualizamos el BehaviorSubject con la nueva lista de abogados
      tap((data) => {
        this.abogadosSubject.next(data);
      })
    );
  }

  getAllAbogados(): Observable<Abogado[]> {
    return this.abogados$;
  }

  registerAbogado(abogado: any) {
    return this.http.post<any>(`${this.urlRegister}/register/abogado/`, abogado).pipe(
      switchMap(() => this.findAll())
    )
  }


  countAbogadosByEspecialidad() {
    return this.http.get<any[]>(`${this.url}/especialidad/count`)
  }
}
