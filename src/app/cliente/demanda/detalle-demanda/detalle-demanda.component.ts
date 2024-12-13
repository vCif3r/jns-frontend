import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DemandaService } from '../../../core/services/demanda.service';
import { Demanda } from '../../../core/models/demanda';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-detalle-demanda',
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatIconModule
   ],
  templateUrl: './detalle-demanda.component.html',
  styleUrl: './detalle-demanda.component.css'
})
export class DetalleDemandaComponent {
  readonly dialogRef = inject(MatDialogRef<DetalleDemandaComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
  
  demanda?: Demanda;
  demandante: any

  constructor(
    private _demandaService: DemandaService,
    private _auth: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const id = this.data.idDemanda

    this._demandaService.findById(id).subscribe(
      (data:any) => {
        this.demanda = data;  // Asigna el detalle a la variable demanda
        console.log('Detalle de la demanda:', data);
      },
      (error:any) => {
        console.error('Error al obtener los detalles', error);
      }
    );

    this.demandante =  this._auth.getFullnameUser()
  }

  
}
