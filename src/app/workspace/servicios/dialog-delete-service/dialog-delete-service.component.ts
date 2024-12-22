import { Component, Inject, signal } from '@angular/core';
import { ServicioService } from '../../../core/services/servicio.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete-service',
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './dialog-delete-service.component.html',
  styleUrl: './dialog-delete-service.component.css'
})
export class DialogDeleteServiceComponent {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private service: ServicioService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogDeleteServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) { }

  delete() {
    this.service.delete(this.data.id).subscribe((response) => {

      this.snackBar.open('Servicio eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    },
      (error) => {
        this.snackBar.open('Error al eliminar el servicio', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
