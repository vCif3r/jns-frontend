import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caso } from '../models/caso';
import { BehaviorSubject, tap } from 'rxjs';
import { ConsultaService } from './consulta.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  private url = 'http://localhost:3000/casos';

  private casosAdminSubject = new BehaviorSubject<Caso[]>([]);
  casosAdmin$ = this.casosAdminSubject.asObservable();

  private casosAbogadoSubject = new BehaviorSubject<Caso[]>([]);
  casosAbogado$ = this.casosAbogadoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private consultaService: ConsultaService,
    private authService: AuthService,
  ) { }

  findAll() {
    return this.http.get<Caso[]>(this.url);
  }

  cargarCasosAdmin(){
    return this.http.get<Caso[]>(`${this.url}`).subscribe(
      (data) => this.casosAdminSubject.next(data)
    )
  }
  cargarCasosAbogado(idAbogado: any){
    return this.http.get<Caso[]>(`${this.url}/abogado/${idAbogado}`).subscribe(
      (data) => this.casosAbogadoSubject.next(data)
    )
  }

  save(caso: any) {
    return this.http.post<any>(this.url, caso).pipe(
      tap(()=>{
        this.consultaService.cargarConsultasAbogado(this.authService.getID())
      })
    )
  }

  findById(id: any){
    return this.http.get<Caso>(`${this.url}/${id}`);
  }

  update(id: any, casoUpdate: any){
    return this.http.patch<Caso>(`${this.url}/${id}`, casoUpdate).pipe(
      tap((cliente) => {
        const current = this.casosAbogadoSubject.value;
        const index = current.findIndex(c => c.id === id);
        if (index !== -1) {
          current[index] = cliente; 
          this.casosAbogadoSubject.next([...current]);
        }
      })
    );
  }
}
