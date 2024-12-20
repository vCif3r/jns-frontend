import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AbogadoService } from '../../../../core/services/abogado.service';
import { StatisticService } from '../../../../core/services/statistic.service';

Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart-abogados',
  imports: [],
  templateUrl: './pie-chart-abogados.component.html',
  styleUrl: './pie-chart-abogados.component.css'
})
export class PieChartAbogadosComponent {
  labeldata: string[] = [];  // Tipos de cliente
  realdata: number[] = [];   // Cantidades de cada tipo
  colordata: string[] = ['#3357FF', '#F1C40F','#33FF57', '#FF5733'];  // Colores de ejemplo

  constructor(private _statsService: StatisticService) { }

  ngOnInit(): void {
    // Llamamos a la API para obtener los datos de clientes
    this._statsService.countAbogadosByEspecialidad().subscribe(data => {
      if (data) {
        // Extraemos los tipos de clientes y las cantidades
        this.labeldata = data.map(item => item.user_especialidad);
        this.realdata = data.map(item => Number(item.total));

        // Llamamos a la función para renderizar el gráfico
        this.RenderChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  // Función para renderizar el gráfico
  RenderChart(labeldata: string[], valuedata: number[], colordata: string[]): void {
    new Chart('piechartAbogado', {
      type: 'pie',  // Tipo de gráfico: pie
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Especialidad Abogados',
          data: valuedata,
          backgroundColor: colordata,  // Colores asignados a cada tipo
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.label}: ${tooltipItem.raw} abogados`;
              }
            }
          }
        }
      }
    });
  }
}
