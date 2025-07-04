import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  
  loading = false;
  msgErro = '';

  recoverForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
    
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    const email = this.recoverForm.value.email;
    
  }

}
