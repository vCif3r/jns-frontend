import { Component } from '@angular/core';
import { StatisticCardComponent } from '../../core/components/statistic-card/statistic-card.component';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../core/services/cliente.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDemandaComponent } from './charts/chart-demanda/chart-demanda.component';
import { PieChartClientesComponent } from './charts/pie-chart-clientes/pie-chart-clientes.component';
import { PieChartAbogadosComponent } from './charts/pie-chart-abogados/pie-chart-abogados.component';

export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    StatisticCardComponent,
    MatCardModule,
    MatTableModule, 
    MatButtonModule,
    RouterLink,
    ChartDemandaComponent,
    PieChartClientesComponent,
    PieChartAbogadosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo'];
  dataSource: any[] = [];

  constructor(private _clienteService: ClienteService){}

  ngOnInit(): void {
    this._clienteService.findAll().subscribe(
      (data) => {
        this.dataSource = data; // Asigna la respuesta a la variable dataSource
        console.log('Clientes obtenidos exitosamente', data);
      },
      (error) => {
        console.error('Hubo un error al obtener los clientes', error);
      }
    );
  }
}
