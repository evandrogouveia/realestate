import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditThemeService } from '../edit-theme/services/edit-theme.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { DepoimentosService } from './services/depoimentos.service';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss']
})
export class DepoimentosComponent implements OnInit {

  imagemSrc = 'assets/img/placeholder.jpg';
  imagemSrcBackground = 'assets/img/placeholder.jpg';

  selectedImage: any = null;
  selectedImageBackground: any = null;

  isAddMode: boolean;
  depoimentos = [];

  addBackgroundDepoimentosForm: FormGroup = this.fb.group({
    ID: [],
    background: ['']
  });

  addDepoimentosForm: FormGroup = this.fb.group({
    ID: [],
    imagem: [''],
    nome: [''],
    funcao: [''],
    descricao: [''],
  });

  constructor(
    private fb: FormBuilder,
    private depoimentosService: DepoimentosService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getDataDepoimentos();
  }

  showPreviewImageBackground(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrcBackground = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageBackground = event.target.files[0];
    } else {
      this.imagemSrcBackground = 'assets/img/placeholder.jpg';
      this.selectedImageBackground = null;
    }
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

  addUpdadeDepoimento() {
    const ID = this.addDepoimentosForm.controls.ID.value;

    const descricao = this.addDepoimentosForm.value.descricao.replace(/<[^>]*>/g, '');
    this.addDepoimentosForm.value.descricao = descricao;

    const formData = new FormData();

    formData.append('background', this.selectedImageBackground);
    formData.append('imagem', this.selectedImage);
    formData.append('formDepoimentos', JSON.stringify(this.addDepoimentosForm.value));
    
    if (ID) {
      this.depoimentosService.updateDepoimento(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.reset();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.depoimentosService.newDepoimento(formData).subscribe(() => {
        this.reset();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  addUpdadeBackgroundDepoimento() {
    const ID = this.addBackgroundDepoimentosForm.controls.ID.value;
    const formData = new FormData();

    formData.append('background', this.selectedImageBackground);
    formData.append('formBackgroundDepoimentos', JSON.stringify(this.addBackgroundDepoimentosForm.value));
    console.log(ID)
    if (ID && ID !== null) {
      this.depoimentosService.updateFundoDepoimento(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.depoimentosService.newFundoDepoimento(formData).subscribe(() => {
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  getDataDepoimentos() {
    this.depoimentosService.getAllDepoimentos().subscribe(res => {
      this.depoimentos = res;
    });

    this.depoimentosService.getFundoDepoimentos().subscribe(res => {
      if (res) {
        this.addBackgroundDepoimentosForm.patchValue(res[0]);
        this.imagemSrcBackground = res[0].background;
      }
    })
  }

  setDataDepoimento(d) {
    this.isAddMode = false;
    d.background ? this.imagemSrcBackground = d.background : this.imagemSrcBackground = 'assets/img/placeholder.jpg';
    d.imagem ? this.imagemSrc = d.imagem : this.imagemSrc = 'assets/img/placeholder.jpg';
    this.addDepoimentosForm.patchValue(d);
    window.scrollTo(0, 600);
  }

  reset() {
    window.scrollTo(0, 1050);
    this.imagemSrc = 'assets/img/placeholder.jpg';
    this.selectedImage = null;
    this.imagemSrcBackground = 'assets/img/placeholder.jpg';
    this.selectedImageBackground = null;
    this.addDepoimentosForm.reset();
    this.getDataDepoimentos();
  }


  openModalConfirmDelete(d){
    const initialState = {
      titleModal: 'Deseja realmente excluir o depoimento de?',
      titlePost: d.nome,
      typeModal: 'aviso',
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(d);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(d: any){
    this.depoimentosService.deleteDepoimento(d.ID).subscribe(() => {
      this.getDataDepoimentos();
      this.toastr.success('Depoimento removido com sucesso', '');
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
