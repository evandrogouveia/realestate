import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  show = false;
  type = 'password';

  clientForm = this.fb.group({
    id: [undefined],
    servico: ['', [Validators.required]],
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    password: ['', [Validators.minLength(6)]],
    fotos: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

}
