import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService  {
  private urlRegister = 'http://localhost:3000/auth'; // url solo para registrar
  private url = 'http://localhost:3000/clientes'; // URL para obtener la lista de clientes

  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  constructor(private http_: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http_.get<Cliente[]>(this.url).pipe(
      tap((data) => {
        this.clientesSubject.next(data);
      })
    );
  }

  registerCliente(cliente: any) {
    return this.http_
      .post<any>(`${this.urlRegister}/register/cliente/`, cliente)
      .pipe(switchMap(() => this.findAll()));
  }

 


  obtenerClientesCedula(searchTerm: string): Observable<any[]> {
    if (!searchTerm.trim()) {
      return new Observable();  // Si no hay término de búsqueda, retorna un observable vacío
    }

    // Realiza la petición HTTP GET con el término de búsqueda
    return this.http_.get<any[]>(`${this.url}?cedula=${searchTerm}`);
  }

  getTipoClientes() {
    return this.http_.get<any[]>(`${this.url}/tipos/count`);
  }
}
