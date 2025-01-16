import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
import { HorizontalBarchartComponent } from './charts/horizontal-barchart/horizontal-barchart.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
    HorizontalBarchartComponent,
    BarchartTotalCasosComponent,
    PieChartAbogadosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  statsCards: Card[] = [];
  latestAbogados?: any;
  currentYear?: number;

  private statisticService = inject(StatisticService)

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

  guardarComoImagen() {
    const contenido = document.getElementById('contenido'); // Asegúrate de darle un id a la sección que quieres capturar

    if (contenido) {
      html2canvas(contenido).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'dashboard.png';
        link.click();
      });
    }
  }
  
}
