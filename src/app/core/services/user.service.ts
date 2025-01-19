import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL}/users`
  private http = inject(HttpClient)

  findAll(){
    return this.http.get<any[]>(this.apiUrl)
  }

  saveUser(data: any){
    return this.http.post(`${this.apiUrl}`, data)
  }

  update(id: any, data: any){
    return this.http.patch(`${this.apiUrl}/${id}`, data)
  }

  remove(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
