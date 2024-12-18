import { ServicioService } from '../../../core/services/servicio.service';
import { Component, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from '../../../core/models/servicio';

@Component({
  selector: 'app-new-servicio',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './form-servicio.component.html',
  styleUrl: './form-servicio.component.css',
})
export class FormServicioComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  isEditMode: boolean;
  servicioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FormServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { servicio: Servicio }
  ) {

    if (data && data.servicio && data.servicio.id) {
      this.isEditMode = true;  // Modo edición
      this.servicioForm = this.fb.group({
        nombre: [data.servicio.nombre || '', Validators.required],
        descripcion: [data.servicio.descripcion || '', [Validators.required]],
        categoria: [data.servicio.categoria || '', [Validators.required]],
        disponible: [data.servicio.disponible],
      });
    } else {
      this.isEditMode = false;  // Modo creación
      this.servicioForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    if (this.servicioForm.invalid) {
      return;
    }
  
    const servicioData: Servicio = this.servicioForm.value;
  
    // Si estamos en modo edición
    if (this.isEditMode) {
      this.servicioService.update(this.data.servicio.id!, servicioData).subscribe(
        (data) => {
          // console.log(data);
          this.snackBar.open('Servicio actualizado correctamente', 'Cerrar', {
            duration: 3000,  // Duración del mensaje en milisegundos
            panelClass: ['success-snackbar']  // Clase para personalizar estilo
          });
          this.dialogRef.close(true); // Cerrar el diálogo al finalizar
        },
        (error) => {
          this.snackBar.open('Error al actualizar el servicio', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      // Si estamos en modo creación
      this.servicioService.save(servicioData).subscribe(
        () => {
          this.snackBar.open('Servicio registrado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true); // Cerrar el diálogo al finalizar
        },
        (error) => {
          this.snackBar.open('Error al registrar el servicio', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }
  

 
}
