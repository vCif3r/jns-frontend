import { Component, inject, Input } from '@angular/core';
import { Caso } from '../../../core/models/caso';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogCasoDetalleComponent } from '../../casos/dialog-caso-detalle/dialog-caso-detalle.component';
import { DialogCasoUpdateComponent } from '../../casos/dialog-caso-update/dialog-caso-update.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-caso',
  imports: [
    TimeAgoPipe,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './card-caso.component.html',
  styleUrl: './card-caso.component.css'
})
export class CardCasoComponent {
  @Input() caso?: Caso;
  role: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  readonly dialog = inject(MatDialog);

  openDialogDetalle(idCaso: any):void{
    this.dialog.open(DialogCasoDetalleComponent, {
      data: {id: idCaso},
      minWidth: '40vw'
    });
  }

  openDialogUpdate(idCaso: any):void{
    this.dialog.open(DialogCasoUpdateComponent, {
      data: {id: idCaso},
      width: '500px',
    });
  }
}