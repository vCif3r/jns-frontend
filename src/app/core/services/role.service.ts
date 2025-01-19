import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.API_URL}/roles`

  private http = inject(HttpClient)

  findAll(){
    return this.http.get<Role[]>(this.apiUrl)
  }

  findOne(id: any){
    return this.http.get<Role>(`${this.apiUrl}/${id}`)
  }

  save(data: Omit<Role, 'id'>){
    return this.http.post(this.apiUrl, data)
  }

  update(id: any, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }
}
