import { Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConsultaService } from '../../../core/services/consulta.service';

@Component({
  selector: 'app-dialog-cancelar-consulta',
  imports: [MatDialogActions,
      MatDialogClose,
      MatDialogContent,
      MatDialogTitle,
      MatButtonModule,
      MatSnackBarModule],
  templateUrl: './dialog-cancelar-consulta.component.html',
  styleUrl: './dialog-cancelar-consulta.component.css'
})
export class DialogCancelarConsultaComponent {
hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogCancelarConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) { }

  cancelar() {
    this.consultaService.cancelarConsultaByAbogado(this.data.id).subscribe((response) => {

      this.snackBar.open('Consulta cancelada con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    },
      (error) => {
        this.snackBar.open('Error al cancelar la consulta', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
