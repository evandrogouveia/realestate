import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';
import { Category } from 'src/app/modules/private/admin/components/blog/models/category.model';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  ;

  constructor() { }

  //LISTAR POSTS
  getPosts(){
    return;
  }

  //ADICIONAR COMENTÁRIOS
  addComments(p: Post){
    return;
  }

  //ATUALIZAR COMENTÁRIOS
  updateComments(p: Post){
    return;
  }

  //LISTAR CATEGORIAS
  getCategory(){
    return;
  }

  searchByName(name: string): Observable<Post[]>{
    return;
  }

  searchByCategory(name: string): Observable<Post[]>{
    return;
  }
}
