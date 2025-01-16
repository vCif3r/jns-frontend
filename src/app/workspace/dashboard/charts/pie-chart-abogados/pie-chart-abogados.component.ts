import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AbogadoService } from '../../../../core/services/abogado.service';
import { StatisticService } from '../../../../core/services/statistic.service';
import { NgApexchartsModule } from 'ng-apexcharts';

Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart-abogados',
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart-abogados.component.html',
  styleUrl: './pie-chart-abogados.component.css'
})
export class PieChartAbogadosComponent {
  labeldata: string[] = [];  // Tipos de cliente
  realdata: number[] = [];   // Cantidades de cada tipo

  public chartOptions: any;

  constructor(private _statsService: StatisticService) { }

  ngOnInit(): void {
    // Llamamos a la API para obtener los datos de clientes
    this._statsService.countAbogadosByEspecialidad().subscribe(data => {
      if (data) {
        // Extraemos los tipos de clientes y las cantidades
        this.labeldata = data.map(item => item.user_especialidad);
        this.realdata = data.map(item => Number(item.total));

        // Llamamos a la función para renderizar el gráfico
        this.RenderChart(this.labeldata, this.realdata);
      }
    });
  }

  // Función para renderizar el gráfico
  RenderChart(labeldata: string[], valuedata: number[]): void {
    this.chartOptions = {
      series: valuedata,
      chart: {
        type: 'pie',
        width: '100%'
        
      },
      labels: labeldata,
      title: {
        text: 'Especialidad Abogados',
        align: 'center'
      },
      tooltip: {
        y: {
          formatter: (value:any) => `${value} abogados`
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      }
    };
  }
}
