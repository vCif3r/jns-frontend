import { Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConsultaService } from '../../../core/services/consulta.service';
@Component({
  selector: 'app-dialog-rechazar-consulta',
  imports: [MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatButtonModule,
        MatSnackBarModule],
  templateUrl: './dialog-rechazar-consulta.component.html',
  styleUrl: './dialog-rechazar-consulta.component.css'
})
export class DialogRechazarConsultaComponent {
hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogRechazarConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) { }

  rechazar() {
    this.consultaService.rechazarConsulta(this.data.id).subscribe((response) => {

      this.snackBar.open('Consulta rechazada con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    },
      (error) => {
        this.snackBar.open('Error al rechazar la consulta', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
