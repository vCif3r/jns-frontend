import { Component, Inject, inject } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-editar-blog',
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
  templateUrl: './editar-blog.component.html',
  styleUrl: './editar-blog.component.css'
})
export class EditarBlogComponent {
  private postService = inject(PostService);
  form: FormGroup;
  snackbar = inject(MatSnackBar)

  imageFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del post a editar
  ) {
    // Inicializamos el formulario con los valores del post
    this.form = this.fb.group({
      titulo: [this.data.titulo, Validators.required],
      contenido: [this.data.contenido, Validators.required],
      publicado: [this.data.publicado],
      categoria: [this.data.categoria, Validators.required],
    });

    console.log(data)
  }

  edit() {
    if (this.form.valid) {
      const formData = new FormData();

      // Añadir los datos del formulario al FormData
      formData.append('titulo', this.form.get('titulo')?.value);
      formData.append('contenido', this.form.get('contenido')?.value);
      formData.append('publicado', this.form.get('publicado')?.value);
      formData.append('categoria', this.form.get('categoria')?.value);

      // Si hay una nueva imagen, añadirla al FormData
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      // Realizar la solicitud HTTP para editar el post
      this.postService.update(`${this.data.id}`, formData).subscribe(
        (data) => {
          this.snackbar.open('Post actualizado correctamente', 'Cerrar', {
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

  // Método para manejar el cambio de imagen
  onFileChange(event: any): void {
    this.imageFile = event.target.files[0]; // Seleccionar el primer archivo
  }

  getImageUrl(imagePath: string): string {
    return this.postService.getImageUrl(imagePath);
  }
}
