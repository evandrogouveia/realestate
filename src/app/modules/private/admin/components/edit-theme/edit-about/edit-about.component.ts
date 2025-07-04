import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { EditThemeService } from '../services/edit-theme.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {
  imagemSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  isAddMode: boolean;

  quemSomosForm: FormGroup = this.fb.group({
    ID: [],
    imagem: [''],
    titulo: [''],
    descricao: [''],
    textoInferior: [''],
    coluna1: this.fb.group({
      titulo: [''],
      descricao: ['']
    }),
    coluna2: this.fb.group({
      titulo: [''],
      descricao: ['']
    }),
    coluna3: this.fb.group({
      titulo: [''],
      descricao: ['']
    })
  });

  constructor(
    private fb: FormBuilder,
    private editThemeService: EditThemeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.setDataForms();
  }

  setDataForms() {
    this.editThemeService.getAllQuemSomos().subscribe(data => {
      if (data[0]) {
        this.imagemSrc = data[0]?.imagem
        this.quemSomosForm.patchValue(data[0]);
      }
    });
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

  addUpdateQuemSomos() {
    const ID = this.quemSomosForm.controls.ID.value;

    const formData = new FormData();

    formData.append('imagem', this.selectedImage);
    formData.append('formQuemSomos', JSON.stringify(this.quemSomosForm.value));
    if (ID) {
      this.editThemeService.updateQuemSomos(ID, formData).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newQuemSomos(formData).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao salvar dados, tente novamente mais tarde', '');
      });
    }
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
