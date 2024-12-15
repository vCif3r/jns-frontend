import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demanda } from '../models/demanda';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DemandaService {
  private url = "http://localhost:3000/demandas";

  constructor(
    private auth: AuthService,
    private _http: HttpClient
  ) { }

  findAll() {
    return this._http.get<Demanda[]>(this.url);
  }
  
  findById(id: number): any {
    return this._http.get<Demanda>(`${this.url}/${id}`);
  }

  saveDemanda(demanda: any, cedula: string){
    return this._http.post<Demanda>(this.url, {...demanda, cedula});
  }

   save(demanda: Demanda): any {
     const token = localStorage.getItem('token');

     const clienteId = this.auth.getID();
    
     if (!token) {
       throw new Error('No estás autenticado');
     }

    demanda.cliente = clienteId
   console.log(demanda)
    
     return this._http.post<Demanda>(this.url, demanda);
   }
}
