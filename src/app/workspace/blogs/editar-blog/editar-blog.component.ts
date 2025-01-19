import { environment } from './../../../../environments/environment';
import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../../core/models/post';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editar-blog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatCardModule,
    EditorModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './editar-blog.component.html',
  styleUrl: './editar-blog.component.css'
})
export class EditarBlogComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private postService = inject(PostService);
  form: FormGroup;
  snackbar = inject(MatSnackBar)
  router = inject(Router)
  imageFile: File | null = null;
  post?: Post

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getOnePost(postId).subscribe((data) => {
        this.post = data;

        // Ahora que tenemos el post, inicializamos el formulario con sus datos
        this.form.patchValue({
          titulo: this.post.titulo,
          contenido: this.post.contenido,
          publicado: this.post.publicado,
          categoria: this.post.categoria,
          resumen: this.post.resumen
        });
      },(error)=> {
        this.router.navigateByUrl('workspace/blogs')
        this.snackbar.open('No se encontro el post', 'Cerrar', {
          duration: 5000,
        });
      });
    }
  }
  constructor(
    private fb: FormBuilder,

  ) {
    // Inicializamos el formulario con los valores del post
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      publicado: [],
      categoria: ['', Validators.required],
      resumen: ['', Validators.required]
    });
  }

  edit() {
    if (this.form.valid) {
      const formData = new FormData();

      // Añadir los datos del formulario al FormData
      formData.append('titulo', this.form.get('titulo')?.value);
      formData.append('contenido', this.form.get('contenido')?.value);
      formData.append('publicado', this.form.get('publicado')?.value);
      formData.append('categoria', this.form.get('categoria')?.value);
      formData.append('resumen', this.form.get('resumen')?.value)

      // Si hay una nueva imagen, añadirla al FormData
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      // Realizar la solicitud HTTP para editar el post
      this.postService.update(`${this.post?.id}`, formData).subscribe(
        (data) => {
          this.snackbar.open('Post actualizado correctamente', 'Cerrar', {
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

  // Método para manejar el cambio de imagen
  onFileChange(event: any): void {
    this.imageFile = event.target.files[0]; // Seleccionar el primer archivo
  }

  apikeytinymce = environment.APIKEY_TINYMCE
  
}
