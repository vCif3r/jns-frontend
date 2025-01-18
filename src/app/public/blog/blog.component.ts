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
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  private postService = inject(PostService);
  postsList: Post[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;

  constructor() {}

  loadPostPublished() {
    this.postService.getPostsPublicados(this.currentPage)
      .subscribe((response: PostResponse) => {
        this.postsList = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
      });
  }

  ngOnInit(): void {
    this.loadPostPublished()
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
}
