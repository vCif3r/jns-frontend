import { Component } from '@angular/core';
import { StatisticService } from '../../../../core/services/statistic.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-horizontal-barchart-consultas-servicio',
  imports: [],
  templateUrl: './horizontal-barchart-consultas-servicio.component.html',
  styleUrl: './horizontal-barchart-consultas-servicio.component.css'
})
export class HorizontalBarchartConsultasServicioComponent {

  constructor(
    private statisticService: StatisticService
  ) { }

  ngOnInit(): void {
    this.statisticService.countConsultasByService().subscribe(data => {
      const labels: string[] = [];
      const datasetConsultas: number[] = [];
      
      data.forEach((element:any) => {
        labels.push(element.servicio);
        datasetConsultas.push(element.cantidadConsultas);
      });

      new Chart('canvasHorizontal', {
        type: 'bar',  // Tipo de gráfico
        data: {
          labels: labels,  // Meses
          datasets: [
            {
              label: 'Cantidad de consultas por servicio',
              data: datasetConsultas,  // Datos de la cantidad de casos
              backgroundColor: 'rgba(63, 81, 181, 0.6)', // Color de las barras
              borderColor: 'rgba(63, 81, 181, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          
          scales: {
            x: {
              title: {
                display: true,
                text: 'Cantidad'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Servicios'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw} consultas`;
                }
              }
            }
          }
        }
      });
      
    });
  }
}
