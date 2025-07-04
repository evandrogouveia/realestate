import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditThemeService } from '../../../../edit-theme/services/edit-theme.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.component.html',
  styleUrls: ['./form-banner.component.scss']
})
export class FormBannerComponent implements OnInit {
  @Input() dataBanner: any;

  imagemSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  isAddMode: boolean;

  addBannerHomeForm: FormGroup = this.fb.group({
    ID: [],
    imagem: [''],
    titulo: [''],
    descricao: [''],
    link: ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private editThemeService: EditThemeService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    if (this.dataBanner) {
      this.addBannerHomeForm.patchValue(this.dataBanner);
      this.imagemSrc = this.dataBanner.imagem;
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

  addUpdadeBannerHome() {
    const ID = this.addBannerHomeForm.controls.ID.value;
    const formData = new FormData();

    formData.append('imagem', this.selectedImage);
    formData.append('formBanners', JSON.stringify(this.addBannerHomeForm.value));

    if (ID) {
      this.editThemeService.updateBanner(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.reset();
        this.bsModalRef.hide();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newBanner(formData).subscribe(() => {
        this.reset();
        this.bsModalRef.hide();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  reset() {
    this.addBannerHomeForm.reset();
    this.imagemSrc = 'assets/img/placeholder.jpg';
    this.selectedImage = null;
  }

}
