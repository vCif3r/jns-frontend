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
import { DemandaComponent } from './cliente/demanda/demanda.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FormDemandaComponent } from './public/procesos/form-demanda/form-demanda.component';
import { RegisterComponent } from './public/register/register.component';
import { FormDenunciaComponent } from './public/procesos/form-denuncia/form-denuncia.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DemandasComponent } from './workspace/demandas/demandas.component';
import { DetallesDemandaComponent } from './workspace/demandas/detalles-demanda/detalles-demanda.component';
import { ClientesComponent } from './workspace/clientes/clientes.component';
import { DashboardComponent } from './workspace/dashboard/dashboard.component';
import { AbogadosComponent } from './workspace/abogados/abogados.component';

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
      { path: 'contact', component: ContactComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      // formularios de  procesos
    ],
  },
  { path: 'demanda', component: FormDemandaComponent, title: 'Nueva demanda' },
  {
    path: 'denuncia',
    component: FormDenunciaComponent,
    title: 'Nueva denuncia',
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [RoleGuard],
  //   data: { role: 'Admin' },
  //   children: [
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     { path: 'dashboard', component: DashboardComponent, title: 'dashboard' },
  //     { path: 'clientes', component: ClientesComponent, title: 'clientes' },
  //     { path: 'abogados', component: AbogadosComponent, title: 'abogados' },
  //   ],
  // },
  // {
  //   path: 'abogado',
  //   component: AbogadoComponent,
  //   canActivate: [RoleGuard],
  //   data: { role: 'Abogado' },
  //   children: [
  //     { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  //     { path: 'demandas', component: DemandasComponent, title: 'demandas' },
  //   ],
  // },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [RoleGuard],
    data: { role: 'Cliente' },
    children: [
      {
        path: 'demanda',
        component: DemandaComponent,
        title: 'Demanda',
      },
    ],
  },

  {
    path: 'workspace',
    component: WorkspaceComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'dashboard',canActivate: [RoleGuard],
        data: { roles: ['Admin','Cliente','Abogado'] }, },
      {
        path: 'clientes',
        component: ClientesComponent,
        title: 'clientes',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      { path: 'abogados', component: AbogadosComponent, title: 'abogados' },
      { path: 'demandas', component: DemandasComponent, title: 'demandas' },
      { path: 'demandas/:id_demanda', component: DetallesDemandaComponent },
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
