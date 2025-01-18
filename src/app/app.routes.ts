import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { HomeComponent } from './public/home/home.component';
import { ServicesComponent } from './public/services/services.component';
import { AboutComponent } from './public/about/about.component';
import { BlogComponent } from './public/blog/blog.component';
import { ContactComponent } from './public/contact/contact.component';
import { RoleGuard } from './core/guards/role.guard';
import { ExperienceComponent } from './public/experience/experience.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ClientesComponent } from './workspace/clientes/clientes.component';
import { DashboardComponent } from './workspace/dashboard/dashboard.component';
import { AbogadosComponent } from './workspace/abogados/abogados.component';
import { ServiciosComponent } from './workspace/servicios/servicios.component';
import { RedirectGuard } from './core/guards/RedirectGuard.guard';
import { PublicGuard } from './core/guards/auth.guard';
import { CasosComponent } from './workspace/casos/casos.component';
import { FormConsultaComponent } from './public/form-consulta/form-consulta.component';
import { ConsultasComponent } from './workspace/consultas/consultas.component';
import { ProfileComponent } from './workspace/profile/profile.component';
import { ContactosComponent } from './workspace/contactos/contactos.component';
import { PostDetalleComponent } from './public/blog/post-detalle/post-detalle.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: PostDetalleComponent},
      { path: 'contact', component: ContactComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'login', component: LoginComponent, title: 'login', canActivate: [PublicGuard] },
    ],
  },
  {
    path: 'nueva-consulta/:id',
    component: FormConsultaComponent,
    title: 'Formulario'
  },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    //canActivate: [RedirectGuard],
    children: [
      { 
        path: '',
        redirectTo: 'dashboard', 
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: ()=> import('./workspace/dashboard/dashboard.component').then((c)=> c.DashboardComponent),
        title: 'dashboard',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'consultas',
        loadComponent: ()=>import('./workspace/consultas/consultas.component').then((c)=>c.ConsultasComponent),
        title: 'consultas',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Abogado'] },
      },
      {
        path: 'servicios',
        loadComponent: () => import('./workspace/servicios/servicios.component').then((c)=>c.ServiciosComponent),
        title: 'servicios',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      
      { path: 'abogados',
        loadComponent: ()=> import('./workspace/abogados/abogados.component').then((c)=>c.AbogadosComponent),
        title: 'abogados',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'casos',
        loadComponent: () => import('./workspace/casos/casos.component').then((c)=>c.CasosComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Abogado'] },
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Abogado'] },
      },
      {
        path: 'contactos',
        loadComponent: () => import('./workspace/contactos/contactos.component').then((c)=>c.ContactosComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'reportes/casos',
        loadComponent: () => import('./workspace/reportes/reportes-casos/reportes-casos.component').then(c => c.ReportesCasosComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        title: 'resportes'
      },
      {
        path: 'reportes/consultas',
        loadComponent: () => import('./workspace/reportes/reportes-consultas/reportes-consultas.component').then(c => c.ReportesConsultasComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        title: 'consultas'
      },
      {
        path: 'blogs',
        loadComponent: () => import('./workspace/blogs/blogs.component').then((c)=>c.BlogsComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        title: 'blog'
      },
      {
        path: 'blogs/create',
        loadComponent: () => import('./workspace/blogs/agregar-blog/agregar-blog.component').then((c) => c.AgregarBlogComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        title: 'Crear Blog'
      },
      
      // Ruta para editar un blog específico, usando un parámetro 'id'
      {
        path: 'blogs/edit/:id',
        loadComponent: () => import('./workspace/blogs/editar-blog/editar-blog.component').then((c) => c.EditarBlogComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        title: 'Editar Blog'
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
