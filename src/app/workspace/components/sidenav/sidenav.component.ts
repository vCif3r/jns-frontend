import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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
        { title: 'Consultas', icon: 'assignment', url: '/workspace/consultas' },
        { title: 'Casos', icon: 'gavels', url: '/workspace/casos' },
        { title: 'Reportes', icon: 'summarize ', url: '/workspace/reportes' },
      ];
    } else if (this.userRole === 'Admin') {
      this.sidebarItems = [
        { title: 'Dashboard', icon: 'dashboard', url: '/workspace/dashboard' },
        { title: 'Servicios', icon: 'library_books', url: '/workspace/servicios' },
        { title: 'Consultas', icon: 'assignment', url: '/workspace/consultas' },
        { title: 'Casos', icon: 'gavels', url: '/workspace/casos' },
        { title: 'Abogados', icon: 'groups', url: '/workspace/abogados' },
        { title: 'Reportes', icon: 'summarize ', url: '/workspace/reportes' },
        { title: 'contactos', icon: 'assignment', url: '/workspace/contactos' },
      ];
    } else{
      this.sidebarItems = [
        { title: 'Clientes', icon: 'people', url: '/admin/clientes' },
        { title: 'Abogados', icon: 'people', url: '/admin/abogados' },
      ];
    }
  }
} 
