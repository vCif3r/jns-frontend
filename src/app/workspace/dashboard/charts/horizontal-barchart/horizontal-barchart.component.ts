import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatisticService } from '../../../../core/services/statistic.service';

@Component({
  selector: 'app-horizontal-barchart',
  imports: [NgApexchartsModule],
  template: `
    @if (chartOptions) {
      <div>
        <apx-chart 
          [series]="series" 
          [chart]="chartOptions.chart" 
          [xaxis]="chartOptions.xaxis" 
          [yaxis]="chartOptions.yaxis" 
          [title]="chartOptions.title" 
          [plotOptions]="chartOptions.plotOptions" 
          [tooltip]="chartOptions.tooltip"
        ></apx-chart>
      </div>
    }
  `
})
export class HorizontalBarchartComponent  {

  title: string = 'Cantidad de Consultas por Servicio';
  xAxisTitle: string = 'Cantidad';
  yAxisTitle: string = 'Servicios';
  categories: string[] = [];
  series: { name: string, data: number[] }[] = [];

  chartOptions?: any;

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.countConsultasByService().subscribe(data => {
      const labels: string[] = [];
      const datasetConsultas: number[] = [];
      
      data.forEach((element: any) => {
        labels.push(element.servicio);
        datasetConsultas.push(element.cantidadConsultas);
      });

      this.categories = labels;
      this.series = [{
        name: 'Cantidad de consultas por servicio',
        data: datasetConsultas
      }];
      
      this.updateChartOptions();
    });
  }

  private updateChartOptions(): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        type: 'bar',
      },
      title: {
        text: this.title,
        align: 'center'
      },
      xaxis: {
        categories: this.categories,
        title: {
          text: this.xAxisTitle
        }
      },
      yaxis: {
        title: {
          text: this.yAxisTitle
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,  // Esto hace que el gráfico sea horizontal
          columnWidth: '55%',
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        shared: true,
        intersect: false,
        custom: ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number, dataPointIndex: number, w: any }) => {
          const value = w.config.series[seriesIndex].data[dataPointIndex];
          return `<div class="p-2"> ${this.categories[dataPointIndex]}: ${value} consultas</div>`;
        }
      }
    };
  }
}
