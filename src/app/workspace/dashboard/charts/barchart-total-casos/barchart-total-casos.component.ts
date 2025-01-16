import { Component } from '@angular/core';
import { StatisticService } from '../../../../core/services/statistic.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barchart-total-casos',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './barchart-total-casos.component.html',
  styleUrl: './barchart-total-casos.component.css'
})
export class BarchartTotalCasosComponent {

  chartOptions: any;

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.statisticService.casosChart().subscribe(data => {

      const meses: string[] = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

      const labels: string[] = [];
      const datasetCasos: number[] = [];
      const datasetConsultas: number[] = [];

      data.forEach((item: any) => {
        const monthFormatted = meses[item.month - 1];
        labels.push(monthFormatted);  // Formato "Mes"
        datasetCasos.push(item.totalCasos);  // Total de casos
        datasetConsultas.push(item.totalConsultas);  // Total de consultas
      });

      this.chartOptions = {
        series: [
          {
            name: 'Casos creados por mes',
            data: datasetCasos
          },
          {
            name: 'Consultas creadas por mes',
            data: datasetConsultas
          }
        ],
        chart: {
          type: 'bar',
          height: 350
        },
        title: {
          text: 'Casos y Consultas por Mes',
          align: 'center'
        },
        xaxis: {
          categories: labels,
          title: {
            text: 'Meses'
          }
        },
        yaxis: {
          title: {
            text: 'Cantidad'
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          shared: true,
          intersect: false
        }
      };
    });
  }
}
