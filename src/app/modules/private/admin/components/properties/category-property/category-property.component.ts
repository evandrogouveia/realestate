import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CategoriaPropriedades } from '../models/propriedades.model';
import { PropriedadesService } from '../services/propriedades.service';

@Component({
  selector: 'app-category-property',
  templateUrl: './category-property.component.html',
  styleUrls: ['./category-property.component.scss']
})
export class CategoryPropertyComponent implements OnInit {

  categoriasPropriedades$: Observable<CategoriaPropriedades>;
  dataInput: string;

  isAddMode: boolean;

  addCategoriasPropriedadesForm: FormGroup = this.fb.group({
    ID: [],
    nome: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private propriedadesService: PropriedadesService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getCategoriasPropriedades();
  }

  getCategoriasPropriedades() {
    this.categoriasPropriedades$ = this.propriedadesService.getAllCategoriasPropriedades();
  }

  addUpdadeCateoriasPropriedades(){
    const ID = this.addCategoriasPropriedadesForm.controls.ID.value;
    if (ID) {
      this.propriedadesService.updateCategoriaPropriedade(ID, this.addCategoriasPropriedadesForm.value).subscribe(() => {
        this.isAddMode = true;
        this.addCategoriasPropriedadesForm.reset();
        this.getCategoriasPropriedades();
        this.toastr.success('Categoria atualizada com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.propriedadesService.newCategoriaPropriedade(this.addCategoriasPropriedadesForm.value).subscribe(() => {
        this.addCategoriasPropriedadesForm.reset();
        this.getCategoriasPropriedades();
        this.toastr.success('Categoria salva com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  setDataCategoriaPropriedades(c): void{
    this.isAddMode = false;
    window.scroll(0, 0);
    this.addCategoriasPropriedadesForm.patchValue(c);
  }

  openModalConfirmDelete(c){
    const initialState = {
      titleModal: 'Deseja realmente excluir esta categoria?',
      titlePost: c.nome,
      typeModal: 'aviso',
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(c);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(c: CategoriaPropriedades){
    this.propriedadesService.deleteCategoriaPropriedade(c.ID).subscribe(() => {
      this.getCategoriasPropriedades();
      this.toastr.success('Categoria removida com sucesso', '');
    });
  }

}
