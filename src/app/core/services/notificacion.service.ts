import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private socket: Socket;
  

  constructor(private auth: AuthService) {
    this.socket = io('http://localhost:3001', {
      query: { userId: this.auth.getID() }, // Aquí estamos enviando el `userId` como parte de la conexión
    });
  }

  connectToSocket(): void {
    const userId = this.auth.getID() 
    this.socket.io.opts.query = { userId };  // Asignar el `userId` al objeto de configuración de la conexión
    this.socket.connect();  // Asegúrate de conectar después de asignar el `userId`
  }

  listenForNotifications(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('notification', (message: string) => {
        console.log('Notificación recibida:', message);
        observer.next(message);
      });
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
