
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { arrayIcones } from '../../shared/arrayIcones';
import { EditThemeService } from '../services/edit-theme.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  icones = arrayIcones;

  isAddMode: boolean;
  submitted = false;

  private geoCoder;

  contatoForm: FormGroup = this.fb.group({
    ID: [],
    titulo: [''],
    coluna1: this.fb.group({
      icone1: [''],
      tituloColuna1: [''],
      descricaoColuna1: [''],
    }),
    coluna2: this.fb.group({
      icone2: [''],
      tituloColuna2: [''],
      descricaoColuna2: [''],
    }),
    coluna3: this.fb.group({
      icone3: [''],
      tituloColuna3: [''],
      descricaoColuna3: [''],
    }),
    coluna4: this.fb.group({
      icone4: [''],
      tituloColuna4: [''],
      descricaoColuna4: [''],
    }),
    endereco: this.fb.group({
      cep: [''],
      rua: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      latitude: [''],
      longitude: ['']
    }),
  });

  constructor(
    private fb: FormBuilder,
    private editThemeService: EditThemeService,
    private toastr: ToastrService,
   // private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.setDataForms();
  }

  setDataForms() {
    this.editThemeService.getAllDadosContatos().subscribe(data => {
      console.log(data)
      if (data[0]) {
        this.contatoForm.patchValue(data[0]);
      }
    });

  }

  addUpdateContato() {
    this.submitted = true;
    const ID = this.contatoForm.controls.ID.value;

    if (ID) {
      this.editThemeService.updateDadosContatos(ID, this.contatoForm.value).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados atualizado com sucesso', '');
        this.submitted = false;
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
        this.submitted = false;
      });
    } else {
      this.editThemeService.newDadosContatos(this.contatoForm.value).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados salvo com sucesso', '');
        this.submitted = false;
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao salvar dados, tente novamente mais tarde', '');
        this.submitted = false;
      });
    }
  }

  getAddressViaCep(): void {
    const CEP = this.contatoForm.controls.endereco.get('cep').value;

    /*this.viacep.buscarPorCep(CEP).subscribe((endereco: Endereco) => {
      this.contatoForm.controls.endereco.get('rua').setValue(endereco.logradouro);
      this.contatoForm.controls.endereco.get('bairro').setValue(endereco.bairro);
      this.contatoForm.controls.endereco.get('cidade').setValue(endereco.localidade);
      this.contatoForm.controls.endereco.get('uf').setValue(endereco.uf);
      this.registerDataMarker(endereco);
    });*/
  }

  registerDataMarker(address) {
    let completeAddress = [
      address.logradouro+', '+
      this.contatoForm.controls.endereco.get('numero').value +' - '+ 
      address.bairro +', '+
      address.localidade +' - '+
      address.uf +', '+
      address.cep
    ];
   /* this.mapsAPILoader.load().then(() => {;
      this.geoCoder = new google.maps.Geocoder;
      this.geoCoder.geocode({ 'address': completeAddress[0] }, (results, status) => {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        this.contatoForm.controls.endereco.get('latitude').setValue(lat);
        this.contatoForm.controls.endereco.get('longitude').setValue(lng);
      });
     });*/
  }
}
