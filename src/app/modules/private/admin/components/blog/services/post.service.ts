import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DE POSTS ***/
  newPost(post): Observable<Post> {
    return this.http.post<any>(`${environment.API_URL}/new-post`, post);
  }
  getPostID(postID): Observable<Post> {
    return this.http.get<any>(`${environment.API_URL}/post/${postID}`);
  }
  getAllPosts(): Observable<Post> {
    return this.http.get<any>(`${environment.API_URL}/all-posts`);
  }
  getSearchPosts(termo): Observable<Post> {
    return this.http.get<any>(`${environment.API_URL}/search-posts`,  {params: {term: termo} });
  }
  updatePost(postID, post): Observable<Post> {
    return this.http.patch<any>(`${environment.API_URL}/update-post/${postID}`, post);
  }
  deletePost(postID): Observable<Post> {
    return this.http.delete<any>(`${environment.API_URL}/delete-post/${postID}`);
  }


}
