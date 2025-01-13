
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { environment } from '../../../environments/environment.development';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AgregarBlogComponent } from './agregar-blog/agregar-blog.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Post, PostResponse } from '../../core/models/post';
import { PostService } from '../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';

@Component({
  selector: 'app-blogs',
  imports: [MatButtonModule, MatTableModule, MatCardModule, CommonModule, MatIconModule, MatSlideToggleModule, FormsModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  private postService = inject(PostService)
  
  postsList: any[] = []
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;

  private snackbar = inject(MatSnackBar)

  loadPosts(){
    this.postService.getPosts(this.currentPage).subscribe((response: PostResponse)=>{
      this.postsList = response.data
      this.totalItems = response.totalItems;
      this.totalPages = response.totalPages;
    })
  }

  ngOnInit(): void {
    this.loadPosts()
  }

  dialog = inject(MatDialog)

  agregar() {
    const dialogRef = this.dialog.open(AgregarBlogComponent, {
      enterAnimationDuration: 500,
      exitAnimationDuration: 500
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Cerrar el diálogo
        this.dialog.closeAll();
        // Actualizar la lista de posts
        this.ngOnInit()
      }
    });
  }

  dialogDelete(id: any){
    const dialogRefDelete = this.dialog.open(DeleteBlogComponent, {
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      data: {id: id}
    });

    dialogRefDelete.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Cerrar el diálogo
        this.dialog.closeAll();
        // Actualizar la lista de posts
        this.ngOnInit()
      }
    });
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPosts();
    }
  }

  onPublicadoChange(element: any): void {
    this.postService.actualizarPublicado(element.id, element.publicado).subscribe({
      next: (response) => {
        this.snackbar.open('Actualizado con éxito', 'Cerrar', {
          duration: 1000,
        });
      },
      error: (error) => {
        this.snackbar.open(`${error.error.message}`, 'Cerrar', {
          duration: 5000,
        });
      }
    });
  }

  getImageUrl(imagePath: string): string {
    return `${environment.API_URL}${imagePath}`;
  }
}
