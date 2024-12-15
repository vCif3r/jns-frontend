import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denuncia } from '../models/denuncia';

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {
  private url = 'http://localhost:3000/denuncias';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Denuncia[]>(this.url);
  }

  save(denuncia: any) {
    return this.http.post<Denuncia>(this.url, denuncia);
  }
}
