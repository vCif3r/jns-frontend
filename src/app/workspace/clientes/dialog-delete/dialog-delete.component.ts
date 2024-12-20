import { Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ClienteService } from '../../../core/services/cliente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-delete',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css',
})
export class DialogDeleteComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) {}

  delete() {
    this.clienteService.delete(this.data.id).subscribe((response) => {

      this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    },
    (error) => {
      this.snackBar.open('Error al eliminar el cliente', 'Cerrar', {
        duration: 3000,
      });
    }
  );
  }
}
