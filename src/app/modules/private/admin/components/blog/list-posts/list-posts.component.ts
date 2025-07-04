import { Component, OnInit } from '@angular/core';
import { map } from 'leaflet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts: any = [];
  dataInput: string;
  term; 
  constructor(
    private postService: PostService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
     this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe((posts: any) => {
      console.log(posts)
      posts.map(p => p.categorias = p.categorias);
      this.posts = posts;
     })
  }

  openModalConfirmDelete(p){
    const initialState = {
      titleModal: 'Deseja realmente excluir o Post?',
      titlePost: p.titulo,
      typeModal: 'aviso',
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(p);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(p: any){
    this.postService.deletePost(p.ID).subscribe(() => {
      this.getPosts();
      this.toastr.success('Post removido com sucesso', '');
    });
  }

}
