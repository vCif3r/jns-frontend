import { CasoService } from './../core/services/caso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Caso } from '../core/models/caso';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-caso-cliente',
  imports: [MatIconModule],
  templateUrl: './caso-cliente.component.html',
  styleUrl: './caso-cliente.component.css'
})
export class CasoClienteComponent implements OnInit {

  constructor(
  ) {}

  caso?: Caso

  ngOnInit():void{
    
  }
  
}
