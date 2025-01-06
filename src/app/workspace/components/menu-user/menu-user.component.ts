import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-menu-user',
  imports: [MatIconModule,
    MatMenuModule,
    RouterLink,
    MatButtonModule,],
  templateUrl: './menu-user.component.html',
  styleUrl: './menu-user.component.css'
})
export class MenuUserComponent {
  email: any;
  role: string;
  fullname: string;
  id: any

  constructor(private _authService: AuthService) {
    this.email = _authService.getEmailUser();
    this.role = _authService.getRole();
    this.fullname = _authService.getnameUser();
    this.id = _authService.getID()
  }

}
