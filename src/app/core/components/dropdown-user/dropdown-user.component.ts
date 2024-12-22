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

  constructor(private authService: AuthService) {
    this.email = authService.getEmailUser();
    this.role = authService.getRole();
  }

  ngOnInit(): void {
    this.fullname = this.authService.getnameUser()
  }

  logout(): void {
    this.authService.logout();
  }
}
