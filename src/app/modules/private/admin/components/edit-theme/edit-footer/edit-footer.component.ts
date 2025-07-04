import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditFooterService } from './services/edit-footer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-footer',
  templateUrl: './edit-footer.component.html',
  styleUrls: ['./edit-footer.component.scss']
})
export class EditFooterComponent implements OnInit {
  imagemSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  isAddMode: boolean;

  footerForm: FormGroup = this.fb.group({
    ID:[],
    logo: [''],
    endereco: [''],
    telefone: [''],
    email: [''],
    menu: this.fb.group({
      menu1: [''],
      menu2: [''],
      menu3: [''],
      menu4: [''],
      menu5: ['']
    }),
    redesSociais: this.fb.group({
      descricao: [''],
      facebook: [''],
      twitter: [''],
      telegram: [''],
      instagram: ['']
    }),
    copyright: ['']
  });

  constructor(
    private fb: FormBuilder,
    private editFooterService: EditFooterService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getFooter();
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imagemSrc = 'assets/img/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  addUpdateFooter() {
    const ID = this.footerForm.controls.ID.value;
    const formData = new FormData();

    formData.append('imagem', this.selectedImage);
    formData.append('formFooter', JSON.stringify(this.footerForm.value));

    if (ID) {
      this.editFooterService.updateFooter(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.getFooter();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        console.log(err)
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editFooterService.newFooter(formData).subscribe(() => {
        this.getFooter();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        console.log(err)
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  getFooter() {
    this.editFooterService.getFooter().subscribe(footer => {
      if (footer[0]?.ID) {
        this.imagemSrc = footer[0].logo;
        this.isAddMode = false;
        this.footerForm.patchValue(footer[0]);
      }
    });
  }
  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '1rem',
    placeholder: 'Digite o texto aqui...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'customClasses',
        'insertUnorderedList',
        'insertOrderedList',
      ]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    
  };

}
