import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() isHandset$?: Observable<boolean>;

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  email: any;

  constructor(private _authService: AuthService) {
    this.email = _authService.getEmailUser();
  }

  logout() {
    this._authService.logout();
  }
}
