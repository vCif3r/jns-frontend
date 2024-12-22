import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AbogadoService } from '../../../core/services/abogado.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete-abogado',
  imports: [MatDialogActions,
      MatDialogClose,
      MatDialogContent,
      MatDialogTitle,
      MatButtonModule,
      MatSnackBarModule],
  templateUrl: './dialog-delete-abogado.component.html',
  styleUrl: './dialog-delete-abogado.component.css'
})
export class DIalogDeleteAbogadoComponent {
hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private abogadoService: AbogadoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DIalogDeleteAbogadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) {}

  delete() {
    this.abogadoService.delete(this.data.id).subscribe((response) => {

      this.snackBar.open('Abogado eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    },
    (error) => {
      this.snackBar.open('Error al eliminar el abogado', 'Cerrar', {
        duration: 3000,
      });
    }
  );
  }
}
