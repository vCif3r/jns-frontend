import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { MenuUserComponent } from '../../../workspace/components/menu-user/menu-user.component';
import { NotificacionService } from '../../services/notificacion.service';
import { AuthService } from '../../services/auth.service';
import {MatBadgeModule} from '@angular/material/badge';
import { io } from 'socket.io-client';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';


@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    MenuUserComponent,
    MatBadgeModule,
    TimeAgoPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit  {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() isHandset$?: Observable<boolean>;

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  unreadCount: number = 0;
  private socket: any;
  notifications: any[] = [];

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    const userId = this.authService.getID();

    this.socket = io('http://localhost:3001', {
      query: { userId }
    });

    // Escuchar las notificaciones del servidor
    this.socket.on('notifications', (notifications: any[]) => {
      this.notifications = notifications;
      this.updateUnreadCount(); 
      console.log(notifications);
    });

    // Escuchar una nueva notificación individual
    this.socket.on('notification', (notification: any) => {
      this.notifications.unshift(notification); // Agregar la nueva notificación
      this.updateUnreadCount(); 
      console.log(notification);
    }); 

    this.socket.on('notificationsRead', () => {
      this.notifications.forEach(notification => {
        if (!notification.leido) {
          notification.leido = true; // Cambiar el estado de las notificaciones no leídas a leídas
        }
      });
      this.updateUnreadCount(); 
    });
  }

  

  markNotificationsRead() {
    const userId = this.authService.getID()
    console.log('id recibido: ', userId);
    // Emitir un evento para marcar las notificaciones como leídas en el servidor
    this.socket.emit('markNotificationsAsRead', userId);
  }


  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.leido).length;
  }
}
