import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ServicioService } from '../../core/services/servicio.service';
import { Servicio } from '../../core/models/servicio';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  servicios: Servicio[] = [];
  constructor(
    private servicioService: ServicioService,
  ){}

  ngOnInit(){
    this.servicioService.findAllPublicados().subscribe(data => {
      this.servicios = data;
    });
  }

  
}
