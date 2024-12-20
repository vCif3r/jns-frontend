import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private baseUrl = 'http://localhost:3000/statistics'; // URL base para las estadísticas

  constructor(private http: HttpClient) {}

  // Método para obtener el total de abogados
  getTotalAbogados(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/abogados`);
  }

  getTotalClientes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/clientes`);
  }

  countAbogadosByEspecialidad() {
    return this.http.get<any[]>(`${this.baseUrl}/especialidad/count`)
  }

}
