import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/login/model/user.model';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  imagemSrc = 'assets/img/icons/user-empty.svg';
  selectedImage: any = null;
  currentUser$: Observable<User>;

  show1 = false;
  show2 = false;

  functions: any = ['admin', 'usuario'];

  updateProfileForm: FormGroup = this.fb.group({
    ID: [''],
    foto: [''],
    nomeCompleto: ['', [Validators.required]],
    nomeSocial: ['', [Validators.required]],
    email: ['', [Validators.required]],
    senha: [''],
    tipoUsuario: [''],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    console.log(ID)
    this.currentUser$ = this.userService.getUserById(ID);
    this.currentUser$.subscribe(data => {
      console.log(data)
      this.updateProfileForm.patchValue(data[0]);
      data[0]?.foto && data[0]?.foto !== 'undefined' ? this.imagemSrc = data[0]?.foto : this.imagemSrc = this.imagemSrc;
    });
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imagemSrc = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  updateUser(){
    let user = this.updateProfileForm.value;
    const formData = new FormData();
    formData.append('foto', this.selectedImage);
    formData.append('formUsuarios', JSON.stringify(this.updateProfileForm.value))
    
    this.userService.updateUser(user.ID, formData).subscribe(res => {
      this.toastr.success('Usuário atualizado com sucesso!');
    },() => {
      this.toastr.error('Ocorreu um erro ao atualizar o usuário');
    });
  }

}
