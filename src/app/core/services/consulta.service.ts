import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url = 'http://localhost:3000/consultas'

  constructor(private http: HttpClient) { }

  finfAll(){
    return this.http.get<Consulta[]>(this.url)
  }

  save(consulta: any){
    return this.http.post<any>(this.url, consulta)
  }

  findById(id: number){
    return this.http.get<Consulta>(`${this.url}/${id}`)
  }

}
