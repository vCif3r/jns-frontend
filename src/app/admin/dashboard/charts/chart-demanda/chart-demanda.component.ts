import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; 
import { DemandaService } from '../../../../core/services/demanda.service';
import { Demanda } from '../../../../core/models/demanda';
Chart.register(...registerables)

@Component({
  selector: 'app-chart-demanda',
  imports: [],
  templateUrl: './chart-demanda.component.html',
  styleUrl: './chart-demanda.component.css'
})
export class ChartDemandaComponent implements OnInit {

  demandas: Demanda[] = [];
  labeldata: string[] = [];
  realdata: number[] = [];
  colordata: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'];  // Colores de ejemplo

  constructor(private _dmdService: DemandaService) {}

  ngOnInit(): void {
    this._dmdService.findAll().subscribe(data => {
      this.demandas = data;
      if (this.demandas != null) {
        // Contar las demandas por tipo
        const tipoCount = this.countDemandasByTipo(this.demandas);
        
        // Separar las claves y valores
        this.labeldata = Object.keys(tipoCount);  // Tipos de demanda
        this.realdata = Object.values(tipoCount); // Cantidades de cada tipo
        
        this.RenderChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  // Función para contar demandas por tipo
  countDemandasByTipo(demandas: Demanda[]): { [key: string]: number } {
    return demandas.reduce((acc, demanda) => {
      acc[demanda.tipo] = (acc[demanda.tipo] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  // Función para renderizar el gráfico
  RenderChart(labeldata: string[], valuedata: number[], colordata: string[]): void {
    new Chart('barchart', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Tipos de demandas',
          data: valuedata,
          backgroundColor: colordata
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}