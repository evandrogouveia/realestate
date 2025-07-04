import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorias$: Observable<any>;
  dataInput: string;

  isAddMode: boolean;
  term;
  addCategoriasForm: FormGroup = this.fb.group({
    ID: [],
    nome: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getCategorias();
  }

  getCategorias() {
    this.categorias$ = this.categoryService.getAllCategorias();
  }

  addUpdadeCateorias(){
    const ID = this.addCategoriasForm.controls.ID.value;
    if (ID) {
      this.categoryService.updateCategoria(ID, this.addCategoriasForm.value).subscribe(() => {
        this.isAddMode = true;
        this.addCategoriasForm.reset();
        this.getCategorias();
        this.toastr.success('Categoria atualizada com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.categoryService.newCategoria(this.addCategoriasForm.value).subscribe(() => {
        this.addCategoriasForm.reset();
        this.getCategorias();
        this.toastr.success('Categoria salva com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  setDataCategoria(c): void{
    this.isAddMode = false;
    window.scroll(0, 0);
    this.addCategoriasForm.patchValue(c);
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

  delete(c: any){
    this.categoryService.deleteCategoria(c.ID).subscribe(() => {
      this.getCategorias();
      this.toastr.success('Categoria removida com sucesso', '');
    });
  }

}
