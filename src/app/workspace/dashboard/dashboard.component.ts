import { Component } from '@angular/core';
import { StatisticCardComponent } from '../components/statistic-card/statistic-card.component';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../core/services/cliente.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDemandaComponent } from './charts/chart-demanda/chart-demanda.component';
import { PieChartClientesComponent } from './charts/pie-chart-clientes/pie-chart-clientes.component';
import { PieChartAbogadosComponent } from './charts/pie-chart-abogados/pie-chart-abogados.component';
import { StatisticService } from '../../core/services/statistic.service';

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

  totalAbogados: number = 0;
  totalClientes: number = 0;

  constructor(private _clienteService: ClienteService, 
    private statisticService: StatisticService
  ){}

  ngOnInit(): void {
    this.findAllClientes()
    this.getStatistic()
  }

  getStatistic(){
    this.statisticService.getTotalAbogados().subscribe(
      (data) => {
        this.totalAbogados = data;
      }
    )

    this.statisticService.getTotalClientes().subscribe(
      (data) => {
        this.totalClientes = data;
      }
    )
  }

  findAllClientes(){
    this._clienteService.getClientes().subscribe(
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
