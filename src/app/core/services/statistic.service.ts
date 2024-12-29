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
  getStatisticsCards() {
    return this.http.get<any[]>(`${this.baseUrl}/cards`);
  }

  countAbogadosByEspecialidad() {
    return this.http.get<any[]>(`${this.baseUrl}/especialidad/count`)
  }

  latestAbogados() {
    return this.http.get<any>(`${this.baseUrl}/latest/abogados`)
  }

  casosChart() {
    return this.http.get<any>(`${this.baseUrl}/casos-por-mes`)
  }

}
