import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PostService } from '../../../core/services/post.service';
import { Router, RouterLink } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-agregar-blog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    EditorModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './agregar-blog.component.html',
  styleUrl: './agregar-blog.component.css',
})
export class AgregarBlogComponent {
  private postService = inject(PostService);
  form: FormGroup;
  snackbar = inject(MatSnackBar);
  router = inject(Router)

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', [Validators.required, Validators.minLength(10)]],
      resumen: ['', [Validators.required, Validators.minLength(10)]],
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
      formData.append('resumen', this.form.get('resumen')?.value)
      // Si hay una imagen, añadirla al FormData
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.postService.create(formData).subscribe(
        (data) => {
          this.snackbar.open('Post guardado y publicado', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigateByUrl('workspace/blogs')
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

  apikeytinymce = environment.APIKEY_TINYMCE
}
