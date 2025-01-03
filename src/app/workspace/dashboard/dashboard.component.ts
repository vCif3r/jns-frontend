import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatisticCardComponent } from '../components/statistic-card/statistic-card.component';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../core/services/cliente.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PieChartAbogadosComponent } from './charts/pie-chart-abogados/pie-chart-abogados.component';
import { StatisticService } from '../../core/services/statistic.service';
import { MatIconModule } from '@angular/material/icon';
import { BarchartTotalCasosComponent } from './charts/barchart-total-casos/barchart-total-casos.component';
import { RouterLink } from '@angular/router';
import { HorizontalBarchartConsultasServicioComponent } from './charts/horizontal-barchart-consultas-servicio/horizontal-barchart-consultas-servicio.component';

interface Card {
  label: string;
  value: any;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    StatisticCardComponent,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    PieChartAbogadosComponent,
    MatIconModule,
    BarchartTotalCasosComponent,
    HorizontalBarchartConsultasServicioComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  statsCards: Card[] = [];
  latestAbogados?: any;
  currentYear?: number;

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.getlatestAbogados();
    this.getStatisticCards();
    this.currentYear = new Date().getFullYear();
  }

  getStatisticCards() {
    this.statisticService.getStatisticsCards().subscribe((data) => {
      this.statsCards = data;
    });
  }

  getlatestAbogados() {
    this.statisticService.latestAbogados().subscribe((data) => {
      this.latestAbogados = data;
    });
  }

 
  
  
}
