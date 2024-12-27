import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogData } from '../../../cliente/demanda/detalle-demanda/detalle-demanda.component';
import { Caso } from '../../../core/models/caso';
import { CasoService } from '../../../core/services/caso.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-caso-update',
  imports: [
    MatIconModule,
    TimeAgoPipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './dialog-caso-update.component.html',
  styleUrl: './dialog-caso-update.component.css'
})
export class DialogCasoUpdateComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCasoUpdateComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  caso?: Caso;

  selectedEstado?: string;

  constructor(
    private casoService: CasoService,
    private matSnack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.casoService.findById(this.data.id).subscribe(caso => {
      this.caso = caso;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  estadoOptions: Estados[] = [
    { value: 'En inicio', viewValue: 'En inicio' },
    { value: 'En trámite', viewValue: 'En trámite' },
    { value: 'Resuelto en primera instancia', viewValue: 'Resuelto en primera instancia' },
    { value: 'En apelación', viewValue: 'En apelación' },
    { value: 'Resuelto en segunda instancia', viewValue: 'Resuelto en segunda instancia' },
    { value: 'Con casación', viewValue: 'Con casación' },
    { value: 'Resuelto', viewValue: 'Resuelto' },
    { value: 'Cancelado', viewValue: 'Cancelado' }
  ]

  updateEstado(){
    this.casoService.update(this.data.id, {estado: this.selectedEstado}).subscribe(() => {
      this.dialogRef.close();
      this.matSnack.open('El estado del caso ha sido actualizado', 'Cerrar', {
        duration: 5000,
      });
    });
  }

  validate():boolean{
    if(this.selectedEstado == this.caso?.estado){
      return true;
    }
    return false;
  }
}
