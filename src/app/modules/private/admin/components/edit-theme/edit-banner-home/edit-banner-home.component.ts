import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EditThemeService } from '../services/edit-theme.service';

@Component({
  selector: 'app-edit-banner-home',
  templateUrl: './edit-banner-home.component.html',
  styleUrls: ['./edit-banner-home.component.scss']
})
export class EditBannerHomeComponent implements OnInit {
  imagemSrcPaginas = 'assets/img/placeholder.jpg';
  selectedImagePaginas: any = null;
  isAddMode: boolean;
  banners$: Observable<any>;
  bsModalRef?: BsModalRef;

  addBannerPaginasForm: FormGroup = this.fb.group({
    ID: [],
    imagem: [''],
  });

  constructor(
    private fb: FormBuilder,
    private editThemeService: EditThemeService,
    private toastr: ToastrService,
    private modalService: BsModalService,
  
    ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getBanners();
  }

  showPreviewImagePaginas(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrcPaginas = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImagePaginas = event.target.files[0];
    } else {
      this.imagemSrcPaginas = 'assets/img/placeholder.jpg';
      this.selectedImagePaginas = null;
    }
  }

  getBanners() {
    this.banners$ = this.editThemeService.getAllBanners();
    this.editThemeService.getAllBannerPaginas().subscribe(banner => {
      if (banner[0]?.ID) {
        this.imagemSrcPaginas = banner[0]?.imagem;
        this.addBannerPaginasForm.patchValue(banner[0]);
      }
    });
  }

  openModalConfirmDelete(b){
    const initialState = {
      titleModal: 'Deseja realmente excluir este banner?',
      titlePost: b.titulo,
      typeModal: 'aviso',
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(b);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(b: any){
    this.editThemeService.deleteBanner(b.ID).subscribe(() => {
      this.getBanners();
      this.toastr.success('Banner removido com sucesso', '');
    });
  }

  openModalAddBanner() {
    const initialState = {
      titleModal: 'Adicionar Banner',
      typeModal: 'ADD_BANNER',
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-add-banner'}),
    );

    this.modalService.onHide.subscribe(() => {
      this.getBanners();
      window.scroll(0, 0);
    });
  }

  setDataBanners(b): void{
    this.isAddMode = false;
    const initialState = {
      titleModal: 'Atualizar Banner',
      typeModal: 'EDIT_BANNER',
      data: b
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-add-banner'}),
    );

    this.modalService.onHide.subscribe(() => {
      this.getBanners();
      window.scroll(0, 0);
    });
  }

  addUpdadeBannerPaginas() {
    const ID = this.addBannerPaginasForm.controls.ID.value;
    const formData = new FormData();
  
    if(this.selectedImagePaginas){
      formData.append('imagemPaginas', this.selectedImagePaginas);
    }
    formData.append('formBannerPaginas', JSON.stringify(this.addBannerPaginasForm.value));

    if (ID) {
    
      this.editThemeService.updateBannerPaginas(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.getBanners();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newBannerPaginas(formData).subscribe(() => {
        this.getBanners();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

}
