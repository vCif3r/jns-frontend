import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ClienteService } from '../../../../core/services/cliente.service';

Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart-clientes',
  imports: [],
  templateUrl: './pie-chart-clientes.component.html',
  styleUrl: './pie-chart-clientes.component.css'
})
export class PieChartClientesComponent {
  labeldata: string[] = [];  // Tipos de cliente
  realdata: number[] = [];   // Cantidades de cada tipo
  colordata: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'];  // Colores de ejemplo

  constructor(private _clienteService: ClienteService) {}

  ngOnInit(): void {
    // Llamamos a la API para obtener los datos de clientes
    this._clienteService.getTipoClientes().subscribe(data => {
      if (data) {
        // Extraemos los tipos de clientes y las cantidades
        this.labeldata = data.map(item => item.cliente_tipo_cliente);
        this.realdata = data.map(item => Number(item.total));
        
        // Llamamos a la función para renderizar el gráfico
        this.RenderChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  // Función para renderizar el gráfico
  RenderChart(labeldata: string[], valuedata: number[], colordata: string[]): void {
    new Chart('piechart', {
      type: 'pie',  // Tipo de gráfico: pie
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Tipos de Clientes',
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
                return `${tooltipItem.label}: ${tooltipItem.raw} clientes`;
              }
            }
          }
        }
      }
    });
  }
}
