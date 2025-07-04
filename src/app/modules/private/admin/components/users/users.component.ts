import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../../../../login/model/user.model';
import { ModalComponent } from '../shared/modal/modal.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  dataInput: string;
  currentUser: any = [];
  term;
  
  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  } 

  getUsers() {
    this.users$ = this.userService.getUsers();
    this.userService.getUser().subscribe(user => {
      this.currentUser = user[0];
    });
  }

  openModalAddUser(){
    this.bsModalRef = this.modalService.show(
      AddUserComponent,
      Object.assign({}, {class: 'modal-add-user'})
      );

      this.modalService.onHide.subscribe(() => {
        this.getUsers();
      })
  }

  openModalConfirmDelete(u){
    const initialState = {
      titleModal: 'Deseja realmente excluir o usuário?',
      titlePost: u.nomeSocial,
      typeModal: 'aviso',
      callback: (result) => {//recebe o evento callback true do modal
        if (result == true){
          this.deleteUser(u);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  deleteUser(u: User){
    this.userService.deleteUser(u).subscribe(() => {
      this.getUsers();
      this.toastr.success('Usuário removido com sucesso!');
    }, () => {
      this.toastr.error('Ocorreu um erro na solicitação');
    });
  }

}
