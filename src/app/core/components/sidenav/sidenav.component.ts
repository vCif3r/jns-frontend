import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Navmenu {
  title: string;
  icon: string;
  url: string;
} 

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  userRole?: string;
  sidebarItems: Navmenu[] = [];

  constructor(private _auth: AuthService){}

  ngOnInit(): void {
    this.userRole = this._auth.getRole();
    this.updateSidebar()
  }

  logout(){
    this._auth.logout()
  }
  updateSidebar() {
    if (this.userRole === 'Abogado') {
      this.sidebarItems = [
        { title: 'Dashboard', icon: 'dashboard', url: '/abogado/dashboard' },
        { title: 'Clientes', icon: 'people', url: '/abogado/clientes' },
        { title: 'Abogados', icon: 'people', url: '/abogado/abogados' },
        { title: 'Querellas', icon: 'people', url: '/abogado/querellas' },
        { title: 'Procesos', icon: 'library_books', url: '/abogado/procesos' },
        { title: 'help', icon: 'assignment', url: '/abogado/help' },
      ];
    } else if (this.userRole === 'Admin') {
      this.sidebarItems = [
        { title: 'Dashboard', icon: 'dashboard', url: '/admin/dashboard' },
        { title: 'Clientes', icon: 'people', url: '/admin/clientes' },
        { title: 'Abogados', icon: 'people', url: '/admin/abogados' },
        { title: 'Querellas', icon: 'people', url: '/admin/querellas' },
        { title: 'Procesos', icon: 'library_books', url: '/admin/procesos' },
        { title: 'help', icon: 'assignment', url: '/admin/help' },
      ];
    } else{
      this.sidebarItems = [
        { title: 'Demandas', icon: 'dashboard', url: '/cliente/demandas' },
        { title: 'Clientes', icon: 'people', url: '/admin/clientes' },
        { title: 'Abogados', icon: 'people', url: '/admin/abogados' },
        { title: 'help', icon: 'assignment', url: '/admin/help' },
      ];
    }
  }
} 
