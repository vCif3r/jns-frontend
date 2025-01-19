import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AreaLegalService } from '../../../core/services/area-legal.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreaLegal } from '../../../core/models/area-legal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-area',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './form-area.component.html',
  styleUrl: './form-area.component.css',
})
export class FormAreaComponent {
  isEditMode: boolean;
  form: FormGroup;

  private areaService = inject(AreaLegalService);
  private snackBar = inject(MatSnackBar);

  constructor(
    private dialogRef: MatDialogRef<FormAreaComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    console.log(data.data)
    if (data && data.data && data.data.id) {
      this.isEditMode = true;
      console.log(data.data);
      this.form = this.fb.group({
        id: [data.data.id || '', Validators.required],
        nombre: [data.data.nombre || '', Validators.required],
        descripcion: [data.data.descripcion || '', Validators.required],
      });
    } else {
      this.isEditMode = false;
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data: AreaLegal = this.form.value;

      if (this.isEditMode) {
        this.areaService.update(this.data.data.id!, data).subscribe(
          (data) => {
            this.snackBar.open('actualizado correctamente', 'Cerrar', {
              duration: 5000, // Duración del mensaje en milisegundos
              panelClass: ['success-snackbar'], // Clase para personalizar estilo
            });
            this.dialogRef.close({ success: true }); // Cerrar el diálogo al finalizar
          },
          (error) => {
            this.snackBar.open('Error al actualizar', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          }
        );
      } else {
        this.areaService.create(data).subscribe(
          (data) => {
            this.snackBar.open('Creado correctamente', 'Cerrar', {
              duration: 5000,
              panelClass: ['success-snackbar'],
            });
            this.dialogRef.close({ success: true });
          },
          (error) => {
            this.snackBar.open('Error al crear', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          }
        );
      }
    } else {
      this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
