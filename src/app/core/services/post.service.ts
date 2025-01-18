import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Post, PostResponse } from '../models/post';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient)

  constructor() { }

  getPosts(page: number = 1): Observable<PostResponse>{
    return this.http.get<PostResponse>(`${environment.API_URL}/posts?page=${page}`)
    
  }

  actualizarPublicado(id: number, publicado: boolean) {
      return this.http.put(`${environment.API_URL}/posts/publicado/${id}`, { publicado }).pipe(
        catchError(error => {
          // Aquí puedes manejar errores globales
          console.error('Error en la actualización:', error);
          return throwError(error); // Re-throw para que el error llegue al componente
        })
      );
  }

  getPostsPublicados(page: number = 1): Observable<PostResponse>{
    return this.http.get<PostResponse>(`${environment.API_URL}/posts/publicados?page=${page}`)
  }

  getOnePost(id: any){
    return this.http.get<Post>(`${environment.API_URL}/posts/${id}`).pipe(
      map(post => {
        // Transformar el campo 'image' utilizando el método 'getImageUrl'
        post.imagen = this.getImageUrl(post.imagen);  // Se reemplaza la ruta relativa con la URL completa
        return post;
      }))
  }

  deletePost(id: any){
    return this.http.delete(`${environment.API_URL}/posts/${id}`)
  }

  create(data: any){
    return this.http.post(`${environment.API_URL}/posts`, data)
  }

  update(id:any, data: any){
    return this.http.put(`${environment.API_URL}/posts/${id}`, data)
  }

  getImageUrl(imagePath: string): string {
    return `${environment.API_URL}${imagePath}`;
  }
}
