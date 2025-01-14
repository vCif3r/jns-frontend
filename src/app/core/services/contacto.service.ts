import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Contacto } from '../models/contacto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  private urlApi = environment.API_URL;


  crearContacto(contacto: Contacto):Observable<Contacto> {
    return this.http.post<Contacto>(`${this.urlApi}/contactos`, contacto);
  }

  findAll() {
    return this.http.get<Contacto[]>(`${this.urlApi}/contactos`);
  }

  findOne(id: any){
    return this.http.get<Contacto>(`${this.urlApi}/contactos/${id}`);
  }
}
