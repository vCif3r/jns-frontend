import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/role';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-form-role',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogTitle, TextFieldModule, MatDialogClose],
  templateUrl: './form-role.component.html',
  styleUrl: './form-role.component.css',
})
export class FormRoleComponent {
  isEditMode: boolean;
  private snackBar = inject(MatSnackBar)
  form: FormGroup;
  private roleService = inject(RoleService)

  constructor(
    private dialogRef: MatDialogRef<FormRoleComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    if (data && data.data && data.data.id) {
      this.isEditMode = true;
      this.form = this.fb.group({
        nombre: [data.data.nombre || '', Validators.required],
        descripcion: [data.data.descripcion || '', [Validators.required]],
      });
    } else {
      this.isEditMode = false;
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', [Validators.required]],
      });
    }
    // end form construction
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const abogadoData: Role = this.form.value;
    // Si estamos en modo edición
    if (this.isEditMode) {
      this.roleService
        .update(this.data.data.id!, abogadoData)
        .subscribe(
          (data) => {
            this.snackBar.open('Rol actualizado correctamente', 'Cerrar', {
              duration: 6000, // Duración del mensaje en milisegundos
              panelClass: ['success-snackbar'], // Clase para personalizar estilo
            });
            this.dialogRef.close({success: true}); // Cerrar el diálogo al finalizar
          },
          (error) => {
            this.snackBar.open('Error al actualizar el rol', 'Cerrar', {
              duration: 5000,
            });
          }
        );
    } else {
      // Si estamos en modo creación
      this.roleService.save(abogadoData).subscribe(
        () => {
          this.snackBar.open('Rol registrado correctamente', 'Cerrar', {
            duration: 5000
          });
          this.dialogRef.close({success: true}); // Cerrar el diálogo al finalizar
        },
        (error) => {
          this.snackBar.open('Error al registrar el rol', 'Cerrar', {
            duration: 5000
          });
        }
      );
    }
  }

  get f() {
    return this.form.controls;
  }
}
