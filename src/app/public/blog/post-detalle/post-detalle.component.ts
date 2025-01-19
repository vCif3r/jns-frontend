import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-detalle',
  imports: [CommonModule, MatIconModule],
  templateUrl: './post-detalle.component.html',
  styleUrl: './post-detalle.component.css'
})
export class PostDetalleComponent {
  private route = inject(ActivatedRoute)
  post: Post | undefined
  private postService = inject(PostService)
  ngOnInit():void{
    
    this.postService.getOnePost(this.route.snapshot.paramMap.get('id')).subscribe((data)=>{
      this.post = data
    })

  }
}
