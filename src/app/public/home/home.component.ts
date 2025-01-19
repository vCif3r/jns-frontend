import { StatisticService } from './../../core/services/statistic.service';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ServicioService } from '../../core/services/servicio.service';
import { Servicio } from '../../core/models/servicio';
import { AreaLegalService } from '../../core/services/area-legal.service';
import { AreaLegal } from '../../core/models/area-legal';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  areas: AreaLegal[] = [];
  caracteristicas: any;
  
  private areaLegalService = inject(AreaLegalService)
  private statisticService = inject(StatisticService) 

  ngOnInit(){
    this.areaLegalService.findAll().subscribe(data => {
      this.areas = data;
    });

    this.statisticService.getCaracteristicasHome().subscribe(data => {
      this.caracteristicas = data;
    })
  }

  
}
