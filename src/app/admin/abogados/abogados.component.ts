import { Component, inject, OnInit } from '@angular/core';
import { Abogado } from '../../core/models/abogado';
import { AbogadoService } from '../../core/services/abogado.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewAbogadoComponent } from './new-abogado/new-abogado.component';

@Component({
  selector: 'app-abogados',
  imports: [RouterLink, MatIconModule, ],
  templateUrl: './abogados.component.html',
  styleUrl: './abogados.component.css'
})
export class AbogadosComponent implements OnInit {
  abogados: Abogado[] = [];

  constructor(private abogadoService: AbogadoService) { }

  ngOnInit(): void {
    // Nos suscribimos al BehaviorSubject para recibir actualizaciones
    this.abogadoService.abogados$.subscribe((data) => {
      this.abogados = data; // Actualizamos la lista de abogados con los datos recibidos
    });

    // Cargamos inicialmente la lista de abogados
    this.abogadoService.findAll().subscribe();
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(NewAbogadoComponent);
  }
}
