import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Navbar } from './models/navbar.model';
import { Topbar } from './models/topbar.model';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})

export class EditHeaderComponent implements OnInit {
  logoSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  topbarData$: Observable<Topbar[]>;
  topbarId: any = [];

  navbarData$: Observable<Navbar[]>;
  navbarId: any = [];

  isAddMode: boolean;

  addEditHeaderForm: FormGroup = this.fb.group({
    ID: [],
    topBar: this.fb.group({
      email: [''],
      enderecoCompleto: [''],
      facebook: [''],
      twitter: [''],
      telegram: [''],
      instagram: ['']
    }),
    navBar: this.fb.group({
      logo: [''],
      menu1: [''],
      menu2: [''],
      menu3: [''],
      menu4: [''],
      menu5: [''],
    })
  });


  constructor(
    private fb: FormBuilder,
    private headerService: HeaderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getHeader();
  }

  showPreviewLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.logoSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.logoSrc = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  submitHeader() {
    const ID = this.addEditHeaderForm.controls.ID.value;
    const formData = new FormData();

    formData.append('imagem', this.selectedImage);
    formData.append('formHeader', JSON.stringify(this.addEditHeaderForm.value));

    if (ID) {
      this.headerService.updateHeader(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.getHeader();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        console.log(err)
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.headerService.newHeader(formData).subscribe(() => {
        this.getHeader();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        console.log(err)
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  getHeader() {
    this.headerService.getHeader().subscribe(header => {
      if (header[0]?.ID) {
        this.logoSrc = header[0].navBar.logo;
        this.isAddMode = false;
        this.addEditHeaderForm.patchValue(header[0]);
      }
    });
  }

}
