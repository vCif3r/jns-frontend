import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApelacionService {

  constructor(private http: HttpClient) { }

  save(data: any){
    return this.http.post('',data)
  }
}
