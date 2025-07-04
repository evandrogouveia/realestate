import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  show = false;
  type = 'password';
 
  loading = false;
  msgErro = '';

  remember = false;

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  showHidPassword() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  isChecked(event){
    this.remember =  event.target.checked;
  }

  submitLogin() {
    this.loading = true;
   
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(() => {
        this.loading = false;
      },
        (err) => {
          this.loading = false;
          this.loginErrorNotification(err.message);
        });
    } else {
      this.loading = false;
    }
  }

  private loginErrorNotification(err) {
    this.msgErro = err;
  }

  cadastroUsuario() {
    const newUser = {
      foto: '',
      nomeCompleto: 'Administrador',
      nomeSocial: 'Admin',
      email: 'admin@mypagetecnologia.com.br',
      senha:'123456',
      tipoUsuario: 'admin'
    };

    const formData = new FormData();
    formData.append('formUsuarios', JSON.stringify(newUser));

    this.loginService.cadastro(formData)
      .subscribe(
        (u) => {
          console.log('cadastrou');
        },
        (err) => {
         console.log(err);
        }
      );
  }

}
