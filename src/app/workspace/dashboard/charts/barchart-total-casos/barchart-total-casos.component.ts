import { Component } from '@angular/core';
import { StatisticService } from '../../../../core/services/statistic.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-barchart-total-casos',
  imports: [],
  templateUrl: './barchart-total-casos.component.html',
  styleUrl: './barchart-total-casos.component.css'
})
export class BarchartTotalCasosComponent {

  constructor(
    private statisticService: StatisticService
  ){}

  ngOnInit(): void {
    this.statisticService.casosChart().subscribe(data => {

      const meses: string[] = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

      // Formateamos los datos para Chart.js
      const labels: string[] = [];
      const dataset: number[] = [];

      data.forEach((item:any) => {
        // Convertimos item.month a dos dígitos (1-12) y lo usamos para obtener el nombre del mes
        const monthFormatted = meses[item.month - 1]; // Restamos 1 porque el mes empieza desde 1, no desde 0
        labels.push(`${monthFormatted}`);  // Formato "Mes Año"
        dataset.push(item.totalCasos);  // Agregar el total de casos
      });

      // Crear el gráfico de barras
      new Chart('canvas', {
        type: 'bar',  // Tipo de gráfico
        data: {
          labels: labels,  // Meses
          datasets: [{
            label: 'Casos creados por mes',
            data: dataset,  // Datos de la cantidad de casos
            backgroundColor: 'rgba(63, 81, 181, 0.6)', // Color de las barras
            borderColor: 'rgba(63, 81, 181, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Meses'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad de Casos'
              }
            }
          }
        }
      });
    });
  }
}
