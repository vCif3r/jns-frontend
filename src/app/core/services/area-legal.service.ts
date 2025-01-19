import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AreaLegal } from '../models/area-legal';

@Injectable({
  providedIn: 'root'
})
export class AreaLegalService {
  private apiUrl = `${environment.API_URL}/areas`
  private http = inject(HttpClient)

  findAll(){
    return this.http.get<AreaLegal[]>(this.apiUrl)
  }

  findById(id: any){
    return this.http.get<AreaLegal>(`${this.apiUrl}/${id}`)
  }

  create(data: any){
    return this.http.post(this.apiUrl, data)
  }

  update(id: any, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }

  remove(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
