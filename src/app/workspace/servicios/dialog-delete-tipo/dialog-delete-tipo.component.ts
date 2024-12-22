import { Component, Inject, signal } from '@angular/core';
import { TipoServicioService } from '../../../core/services/tipoServicio.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete-tipo',
  imports: [MatDialogActions,
      MatDialogClose,
      MatDialogContent,
      MatDialogTitle,
      MatButtonModule,
      MatSnackBarModule],
  templateUrl: './dialog-delete-tipo.component.html',
  styleUrl: './dialog-delete-tipo.component.css'
})
export class DialogDeleteTipoComponent {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private service: TipoServicioService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogDeleteTipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) { }

  delete() {
    this.service.delete(this.data.id).subscribe((response) => {

      this.snackBar.open('eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    },
      (error) => {
        this.snackBar.open('Error al eliminar', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
