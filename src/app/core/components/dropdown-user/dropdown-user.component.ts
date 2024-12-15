import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-user',
  imports: [MatMenuModule, MatButtonModule, RouterLink],
  templateUrl: './dropdown-user.component.html',
  styleUrl: './dropdown-user.component.css'
})
export class DropdownUserComponent {
  fullname:any;
  email:any;
  role:any;

  constructor(private _authService: AuthService) {
    this.fullname = _authService.getFullnameUser();
    this.email = _authService.getEmailUser();
    this.role = _authService.getRole();
  }

  logout() {
    this._authService.logout();
  }
}
