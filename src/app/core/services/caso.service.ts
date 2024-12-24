import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caso } from '../models/caso';
import { tap } from 'rxjs';
import { ConsultaService } from './consulta.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  private url = 'http://localhost:3000/casos';
  constructor(
    private http: HttpClient,
    private consultaService: ConsultaService,
    private authService: AuthService,
  ) { }

  findAll() {
    return this.http.get<Caso[]>(this.url);
  }

  save(caso: any) {
    return this.http.post<any>(this.url, caso).pipe(
      tap(()=>{
        this.consultaService.cargarConsultasAbogado(this.authService.getID())
      })
    )
  }
}
