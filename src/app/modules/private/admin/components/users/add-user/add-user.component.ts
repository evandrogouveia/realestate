import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/modules/login/model/user.model';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  show = false;
  type = 'password';
  loading:boolean = false;

  addUserForm: FormGroup = this.fb.group({
    ID: [''],
    foto: [''],
    nomeSocial: ['', [Validators.required]],
    nomeCompleto: ['', [Validators.required]],
    email: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    tipoUsuario: ['']
  });
  
  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }

  showHidPassword() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  addUser(){
    this.loading = true;

    const formData = new FormData();
    formData.append('formUsuarios', JSON.stringify(this.addUserForm.value));
  
    this.userService.addUser(formData).subscribe(
      () => {
        
        this.bsModalRef.hide();
        this.loading = false;
        this.toastr.success('Usuário adicionado com sucesso!');
      
      },
      (err) => {
        this.loading = false;
        if(err){
          console.log(err)
          this.toastr.error(err.error.message)
        }
      }
    )
  }

}
