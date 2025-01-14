import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../../environments/environment.development';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-agregar-blog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogClose,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './agregar-blog.component.html',
  styleUrl: './agregar-blog.component.css',
})
export class AgregarBlogComponent {
  private postService = inject(PostService);
  form: FormGroup;
  snackbar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarBlogComponent>
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      publicado: [false],
      categoria: ['', Validators.required],
    });
  }

  create() {
    if (this.form.valid) {
      const formData = new FormData();

      // Añadir los datos del formulario al FormData
      formData.append('titulo', this.form.get('titulo')?.value);
      formData.append('contenido', this.form.get('contenido')?.value);
      formData.append('publicado', this.form.get('publicado')?.value);
      formData.append('categoria', this.form.get('categoria')?.value);

      // Si hay una imagen, añadirla al FormData
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.postService.create(formData).subscribe(
        (data) => {
          this.snackbar.open('Post guardado y publicado', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close({ success: true });
        },
        (error) => {
          this.snackbar.open('Error, revise los datos ingresados', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }

  imageFile: File | null = null;
  onFileChange(event: any): void {
    this.imageFile = event.target.files[0]; // Seleccionar el primer archivo
  }
}
