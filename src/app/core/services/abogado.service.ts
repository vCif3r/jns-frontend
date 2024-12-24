import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Abogado } from '../models/abogado';

@Injectable({
  providedIn: 'root',
})
export class AbogadoService {
  private urlRegister = 'http://localhost:3000/auth'; // url solo para registrar
  private url = 'http://localhost:3000/users'; // URL para obtener la lista de abogados

  private abogadosSubject = new BehaviorSubject<Abogado[]>([]);
  abogados$ = this.abogadosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAbogados();
  }

  private loadAbogados() {
    this.http
      .get<Abogado[]>(`${this.url}/abogados`)
      .subscribe((data) => this.abogadosSubject.next(data));
  }

  getAbogados(): Observable<Abogado[]> {
    return this.abogados$;
  }

  registerAbogado(cliente: Omit<Abogado, 'id'>): Observable<Abogado> {
    return this.http
      .post<Abogado>(`${this.urlRegister}/register/abogado/`, cliente)
      .pipe(
        tap((newAbogado) => {
          const currentAbogados = this.abogadosSubject.value;
          this.abogadosSubject.next([...currentAbogados, newAbogado]);
        })
      );
  }

  updateAbogado(id: number, updateUser: Abogado): Observable<Abogado> {
    return this.http.patch<Abogado>(`${this.url}/${id}`, updateUser).pipe(
      tap((cliente) => {
        const currentAbogados = this.abogadosSubject.value;
        const index = currentAbogados.findIndex((c) => c.id === id);
        if (index !== -1) {
          currentAbogados[index] = cliente;
          this.abogadosSubject.next([...currentAbogados]);
        }
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.abogadosSubject.value;
        this.abogadosSubject.next(currentTasks.filter((a) => a.id !== id));
      })
    );
  }

  // otros metodos

  findAbogadosDisponibles(){
    return this.http.get<Abogado[]>(`${this.url}/abogados/disponibles`)
  }
}
