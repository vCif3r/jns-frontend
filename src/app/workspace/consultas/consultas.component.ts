import { Component } from '@angular/core';
import { ConsultaService } from '../../core/services/consulta.service';
import { Consulta } from '../../core/models/consulta';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardConsultaComponent } from '../components/card-consulta/card-consulta.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-consultas',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CardConsultaComponent
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent {
  consultas: Consulta[] = [];

  titulo: string = '';

  constructor(
    private authSerice: AuthService,
    private consultaService: ConsultaService
  ) { }

  role: any;


  ngOnInit() {
    this.role = this.authSerice.getRole();
    if(this.role === 'Admin' || this.role === 'admin') {
      this.loadConsultasAdmin();
      this.titulo = "Lista de consultas pendientes"
    } else if (this.role === 'Abogado' || this.role === 'abogado') {
      this.loadConsultasAbogado();
      this.titulo = "Consultas asignadas"
    }
  }

  loadConsultasAdmin(){
    this.consultaService.getConsultasPendientes().subscribe(consultas => {
      this.consultas = consultas;
    });
  }

  loadConsultasAbogado(){
    this.consultaService.cargarConsultasAbogado(this.authSerice.getID());
    this.consultaService.consultasAbogado$.subscribe((consultas)=>{
      this.consultas = consultas;
    })
  }

  
}
