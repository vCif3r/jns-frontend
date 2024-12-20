import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService  {
  private urlRegister = 'http://localhost:3000/auth'; // url solo para registrar
  private apiUrl = 'http://localhost:3000/users'; // URL para obtener la lista de clientes

  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  constructor(private http_: HttpClient) {
    this.loadClientes()
  }

  private loadClientes() {
    this.http_.get<Cliente[]>(`${this.apiUrl}/clientes`).subscribe(
      clientes => this.clientesSubject.next(clientes)
    );
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes$;
  }

  registerCliente(cliente: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http_.post<Cliente>(`${this.urlRegister}/register/cliente/`, cliente).pipe(
      tap(newCliente => {
        const currentTasks = this.clientesSubject.value;
        this.clientesSubject.next([...currentTasks, newCliente]);
      })
    );
  }

  updateCliente(id: number, updatedCliente: Cliente): Observable<Cliente> {
    return this.http_.patch<Cliente>(`${this.apiUrl}/${id}`, updatedCliente).pipe(
      tap((cliente) => {
        const currentClientes = this.clientesSubject.value;
        const index = currentClientes.findIndex(c => c.id === id);
        if (index !== -1) {
          currentClientes[index] = cliente; 
          this.clientesSubject.next([...currentClientes]);
        }
      })
    );
  }
  


  delete(id: number): Observable<void> {
    return this.http_.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.clientesSubject.value;
        this.clientesSubject.next(currentTasks.filter(cliente => cliente.id !== id));
      })
    );
  }


  // obtenerClientesCedula(searchTerm: string): Observable<any[]> {
  //   if (!searchTerm.trim()) {
  //     return new Observable();  // Si no hay término de búsqueda, retorna un observable vacío
  //   }

  //   // Realiza la petición HTTP GET con el término de búsqueda
  //   return this.http_.get<any[]>(`${this.apiUrl}?cedula=${searchTerm}`);
  // }

  getTipoClientes() {
    return this.http_.get<any[]>(`${this.apiUrl}/tipos/count`);
  }

}
