import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, PageChangedEvent } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Propriedades } from '../models/propriedades.model';
import { PropriedadesService } from '../services/propriedades.service';
import { delay, last } from 'rxjs/operators';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {

  dataInput: string;
  propriedades: any = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems = 0;
  loading = false;

  constructor(
    private propriedadesService: PropriedadesService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPropriedades();
  }

  getPropriedades() {
     this.loading = true;
     this.propriedadesService.getAllPropriedades(this.currentPage, this.itemsPerPage).subscribe((data: any) => {
        this.propriedades = data.results;
        this.totalItems = data.totalItems;
        this.loading = false;
     });
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 200);
    this.currentPage = event.page;
    this.getPropriedades();
  }

  duplicateItem(p) {
    const formData = new FormData();
    p.IDPropriedade = p.IDPropriedade+'- cópia';
    p.titulo = p.titulo+'- cópia';
    formData.append('formPropriedades', JSON.stringify(p));
    this.propriedadesService.newPropriedade(formData).subscribe(() => {
      this.toastr.success('Propriedade duplicada com sucesso', '');
      this.getPropriedades();
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao duplicar a Propriedade, tente novamente mais tarde', '');
    });
  }

  openModalConfirmDelete(p){
    const initialState = {
      titleModal: 'Deseja realmente excluir este Imóvel?',
      titlePost: p.titulo,
      typeModal: 'aviso',
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(p);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(p: Propriedades){
    this.propriedadesService.deletePropriedade(p.ID).subscribe(() => {
      this.getPropriedades();
      this.toastr.success('Propriedade removida com sucesso', '');
    });
  }

}
