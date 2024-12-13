import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http_ : HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.http_.get<Cliente[]>(`http://localhost:3000/clientes`);
  }
}
