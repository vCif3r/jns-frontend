import { Component, inject } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post, PostResponse } from '../../core/models/post';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RouterLink } from '@angular/router';
registerLocaleData(localeEs);

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  private postService = inject(PostService);
  postsList: Post[] = [];
  expandedPosts: { [id: number]: boolean } = {};
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;

  constructor() {}
  loadPostPublished() {
    this.postService.getPostsPublicados(this.currentPage).subscribe((response: PostResponse) => {
      console.log('Respuesta de la API:', response); // Este console.log solo es válido dentro de la función
      this.postsList = response.data;
      this.totalItems = response.totalItems;
      this.totalPages = response.totalPages;
  
      this.postsList.forEach(post => {
        console.log('Post:', post); // Verifica cada post
        if (!(post.id in this.expandedPosts)) {
          this.expandedPosts[post.id] = false;
        }
      });
    });
  }
  
  

  ngOnInit(): void {
    this.loadPostPublished();
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPostPublished();
    }
  }

  getImageUrl(imagePath: string): string {
    return `${environment.API_URL}${imagePath}`;
  }

  toggleExpand(postId: number): void {
    this.expandedPosts[postId] = !this.expandedPosts[postId];
  }

  isExpanded(postId: number): boolean {
    return this.expandedPosts[postId];
  }
}
