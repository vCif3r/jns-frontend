import { Component, Inject, inject } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-blog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './delete-blog.component.html',
  styleUrl: './delete-blog.component.css',
})
export class DeleteBlogComponent {
  private postService = inject(PostService);
  private snackBar = inject(MatSnackBar);
  constructor(
    private dialogRefDelete: MatDialogRef<DeleteBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) {}

  delete() {
    this.postService.deletePost(this.data.id).subscribe(
      (response) => {
        this.snackBar.open('Post eliminado con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.dialogRefDelete.close({ success: true });
      },
      (error) => {
        this.snackBar.open('Error al eliminar el Post', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
