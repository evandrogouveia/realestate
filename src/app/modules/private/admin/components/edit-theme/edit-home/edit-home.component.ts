import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { arrayIcones } from '../../shared/arrayIcones';
import { EditThemeService } from '../services/edit-theme.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {

  icones = arrayIcones;

  isAddMode: boolean;

  homeForm: FormGroup = this.fb.group({
    ID: [],
    secaoOne: this.fb.group({
      titulo: [''],
      subtitulo: [''],
      coluna1: this.fb.group({
        icone1: [''],
        tituloColuna1: [''],
        descricaoColuna1: [''],
        linkColuna1: [''],
      }),
      coluna2: this.fb.group({
        icone2: [''],
        tituloColuna2: [''],
        descricaoColuna2: [''],
        linkColuna2: [''],
      }),
      coluna3: this.fb.group({
        icone3: [''],
        tituloColuna3: [''],
        descricaoColuna3: [''],
        linkColuna3: [''],
      }),
      coluna4: this.fb.group({
        icone4: [''],
        tituloColuna4: [''],
        descricaoColuna4: [''],
        linkColuna4: [''],
      }),
    }),
    secaoTwo: this.fb.group({
      titulo: [''],
      subtitulo: [''],
      gridSecao2: ['']
    }),
    secaoNoticias: this.fb.group({
      titulo: [''],
      subtitulo: [''],
      gridNoticias: ['']
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
    this.editThemeService.getAllDadosHome().subscribe(data => {
      console.log(data)
      if (data[0]) {
        this.homeForm.patchValue(data[0]);
      } else {
        this.homeForm.controls.secaoTwo.get('gridSecao2').patchValue('3');
        this.homeForm.controls.secaoNoticias.get('gridNoticias').patchValue('4');
      }
    });

  }

  addUpdateHome() {
    const ID = this.homeForm.controls.ID.value;
    this.replaceHtmlTags();
    if (ID) {
      this.editThemeService.updateDadosHome(ID, this.homeForm.value).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newDadosHome(this.homeForm.value).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao salvar dados, tente novamente mais tarde', '');
      });
    }
  }

  replaceHtmlTags() {
      const subtituloSecaoOne = this.homeForm.controls.secaoOne.value.subtitulo.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoOne.value.subtitulo = subtituloSecaoOne;

      const descricaoColuna1 = this.homeForm.controls.secaoOne.get('coluna1').value.descricaoColuna1.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoOne.get('coluna1').value.descricaoColuna1 = descricaoColuna1;
      const descricaoColuna2 = this.homeForm.controls.secaoOne.get('coluna2').value.descricaoColuna2.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoOne.get('coluna2').value.descricaoColuna2 = descricaoColuna2;
      const descricaoColuna3 = this.homeForm.controls.secaoOne.get('coluna3').value.descricaoColuna3.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoOne.get('coluna3').value.descricaoColuna3 = descricaoColuna3;
      const descricaoColuna4 = this.homeForm.controls.secaoOne.get('coluna4').value.descricaoColuna4.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoOne.get('coluna4').value.descricaoColuna4 = descricaoColuna4;

      const subtituloSecaoTwo = this.homeForm.controls.secaoTwo.value.subtitulo.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoTwo.value.subtitulo = subtituloSecaoTwo;

      const subtituloSecaoNoticias = this.homeForm.controls.secaoNoticias.value.subtitulo.replace(/<[^>]*>/g, '');
      this.homeForm.controls.secaoNoticias.value.subtitulo = subtituloSecaoNoticias;

      return this.homeForm.value;
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
