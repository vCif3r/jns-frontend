import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface Navmenu {
  title: string;
  icon: string;
  url?: string;
  children?: any[]
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
      ];
    } else if (this.userRole === 'Admin') {
      this.sidebarItems = [
        { title: 'Dashboard', icon: 'dashboard', url: '/workspace/dashboard' },
        { title: 'Areas Legales', icon: 'library_books', url: '/workspace/areas-legales' },
        { title: 'Servicios', icon: 'work', url: '/workspace/servicios' },
        { title: 'Consultas', icon: 'assignment', url: '/workspace/consultas' },
        { title: 'Casos', icon: 'gavels', url: '/workspace/casos' },
        { title: 'Usuarios', icon: 'groups', url: '/workspace/usuarios' },
        { title: 'Reportes', icon: 'summarize ', 
          children: [
            { title: 'casos', url: '/workspace/reportes/casos' },
            { title: 'consultas', url: '/workspace/reportes/consultas' }
          ]
        },
        { title: 'contactos', icon: 'assignment', url: '/workspace/contactos' },
        { title: 'blog', icon: 'post_add', url: '/workspace/blogs' },
      ];
    } else{
      this.sidebarItems = [
        { title: 'Clientes', icon: 'people', url: '/admin/clientes' },
        { title: 'Abogados', icon: 'people', url: '/admin/abogados' },
      ];
    }
  }
} 
