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

import { RegisterComponent } from './public/register/register.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DemandasComponent } from './workspace/demandas/demandas.component';
import { DetallesDemandaComponent } from './workspace/demandas/detalles-demanda/detalles-demanda.component';
import { ClientesComponent } from './workspace/clientes/clientes.component';
import { DashboardComponent } from './workspace/dashboard/dashboard.component';
import { AbogadosComponent } from './workspace/abogados/abogados.component';
import { ServiciosComponent } from './workspace/servicios/servicios.component';
import { RedirectGuard } from './core/guards/RedirectGuard.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { CasosComponent } from './workspace/casos/casos.component';
import { FormConsultaComponent } from './public/form-consulta/form-consulta.component';
import { ConsultasComponent } from './workspace/consultas/consultas.component';
import { CasoClienteComponent } from './caso-cliente/caso-cliente.component';

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
      { path: 'login', component: LoginComponent, title: 'login', canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, title: 'register',canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'consultas/:id',
    component: FormConsultaComponent,
    title: 'Formulario'
  },
  {
    path: 'miscasos/:idCaso',
    component: CasoClienteComponent,
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
        component: DashboardComponent,
        title: 'dashboard',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Abogado'] },
      },
      {
        path: 'consultas',
        component: ConsultasComponent,
        title: 'consultas',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Abogado'] },
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        title: 'clientes',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
        title: 'servicios',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'servicios/:id',
        component: ServiciosComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      { path: 'abogados',
        component: AbogadosComponent,
        title: 'abogados',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
      },
      { path: 'demandas', component: DemandasComponent, title: 'demandas' },
      { path: 'demandas/:id_demanda', component: DetallesDemandaComponent },
      {
        path: 'casos',
        component: CasosComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Abogado'] },
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
