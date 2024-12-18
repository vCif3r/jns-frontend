import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caso } from '../models/caso';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  private url = 'http://localhost:3000/casos';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Caso[]>(this.url);
  }

  save(caso: any) {
    return this.http.post<any>(this.url, caso);
  }
}
