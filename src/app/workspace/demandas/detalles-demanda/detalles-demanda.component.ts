import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DemandaService } from '../../../core/services/demanda.service';
import { Demanda } from '../../../core/models/demanda';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-detalles-demanda',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './detalles-demanda.component.html',
  styleUrl: './detalles-demanda.component.css'
})
export class DetallesDemandaComponent {
  demandaId: string | null = null;
  demanda?: Demanda

  constructor(private demandaService: DemandaService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.demandaId = this.route.snapshot.paramMap.get('id_demanda');

    this.demandaService.findById(Number(this.demandaId)).subscribe((data:any)=>{
      this.demanda = data;
    });
  }
}
