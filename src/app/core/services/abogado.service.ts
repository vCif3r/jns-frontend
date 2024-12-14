import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abogado } from '../models/abogado';

@Injectable({
  providedIn: 'root'
})
export class AbogadoService {

  constructor(private http_ : HttpClient) { }
  
    findAll(): Observable<Abogado[]>{
      return this.http_.get<Abogado[]>(`http://localhost:3000/abogados`);
    }
  
    countAbogadosByEspecialidad(){
      return this.http_.get<any[]>('http://localhost:3000/abogados/especialidad/count')
    }
}
