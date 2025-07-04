import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PropriedadesService } from '../services/propriedades.service';



@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit, AfterViewInit {

  highlightedImageDestacada = ['assets/img/placeholder.jpg'];
  selectedImageDestacada: any = null;

  emptyImageGallery = 'assets/img/placeholder-white.jpg';
  highlightedImagesGallery = [];
  selectedMultiplesImages: any = [];

  emptyImagePlantas = 'assets/img/placeholder-white.jpg';
  highlightedImagesPlantas = [];
  selectedMultiplesImagesPlantas: any = [];

  selectedCategoriasPropriedades = [];

  emptyVideo = 'assets/img/placeholder-video.jpg';
  urlVideo = [];
  selectedVideo: File;

  loading: boolean = false;
  currentDate = new Date();
  publicationDateProperty;

  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChildren('inputCategories') inputCategories: QueryList<ElementRef>;
  @ViewChildren('inputGalleryImages') inputGalleryImages: QueryList<ElementRef>;

  propertyId: string;
  isAddMode: boolean;

  categoriasPropriedades$: Observable<any>;

  searchAddress: string;
  private geoCoder;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  submitted = false;

  addPropertyForm: FormGroup = this.fb.group({
    ID: [null],
    IDPropriedade: [null, Validators.required],
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
    imagemDestacada: [''],
    imagens: [''],
    preco: ['', Validators.required],
    qtdQuartos: [''],
    qtdBanheiros: [''],
    qtdVagas: [''],
    areaImovel: [''],
    plantas: [''],
    video: [''],
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
    categorias: ['']
  });

  constructor(
    private fb: FormBuilder,
    private propriedadesService: PropriedadesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
   // private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.propertyId;
    this.categoriasPropriedades$ = this.propriedadesService.getAllCategoriasPropriedades();
  }

  ngAfterViewInit(): void {
    this.setDataPropriedade();
  }

  showPreviewImageDestacada(event: any): void {
    this.highlightedImageDestacada = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImageDestacada = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageDestacada = event.target.files[0];
    }
  }

  showPreviewImagesGalery(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length <= 10 && (this.selectedMultiplesImages.length + event.target.files.length) <= 10) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < event.target.files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => this.highlightedImagesGallery.push(e.target.result);
          reader.readAsDataURL(event.target.files[i]);
          this.selectedMultiplesImages.push(event.target.files[i]);
        }
      } else {
        this.toastr.error('Selecione no máximo 10 imagens', '');
        return;
      }
    }
  }

  showPreviewImagesPlantas(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length <= 10 && (this.selectedMultiplesImagesPlantas.length + event.target.files.length) <= 10) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < event.target.files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => this.highlightedImagesPlantas.push(e.target.result);
          reader.readAsDataURL(event.target.files[i]);
          this.selectedMultiplesImagesPlantas.push(event.target.files[i]);
        }
      } else {
        this.toastr.error('Selecione no máximo 10 imagens', '');
        return;
      }
    }
  }

  showPreviewVideo(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.urlVideo.push(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedVideo = event.target.files[0];
    }
  }

  checkCategory(event, isChecked) {
    isChecked = event.target.checked;

    if (isChecked) {
      this.selectedCategoriasPropriedades.push(event.target.value);
    } else {
      const index = this.selectedCategoriasPropriedades.indexOf(event.target.value);
      this.selectedCategoriasPropriedades.splice(index, 1);
    }
  }

  removeImageGallery(i) {
    this.highlightedImagesGallery.splice(i, 1);
    this.selectedMultiplesImages.splice(i, 1);
  }

  removeImagePlantas(i) {
    this.highlightedImagesPlantas.splice(i, 1);
    this.selectedMultiplesImagesPlantas.splice(i, 1);
    this.addPropertyForm.controls.plantas.patchValue(this.highlightedImagesPlantas);
  }

  removeVideo() {
    this.selectedVideo = null;
    this.urlVideo = [];
    this.addPropertyForm.controls.video.patchValue('');
  }

  cancelPublication() {
    this.router.navigate(['private/admin/list-properties']);
  }

  addUpdadePropriedade() {
    this.loading = true;
    this.submitted = true;
    this.addPropertyForm.controls.categorias.patchValue(this.selectedCategoriasPropriedades);
   
    const formData = new FormData();
    formData.append('imagemDestacada', this.selectedImageDestacada);
    
    for (let i in this.selectedMultiplesImages) {
      formData.append('imagens', this.selectedMultiplesImages[i]);
    }

    for (let i in this.selectedMultiplesImages) {
      formData.append('plantas', this.selectedMultiplesImagesPlantas[i]);
    }

    formData.append('video', this.selectedVideo);
    
    formData.append('formPropriedades', JSON.stringify(this.addPropertyForm.value));
    console.log(this.addPropertyForm.value)
    if (this.isAddMode) {
      //remove as tags html da descrição
      const descricaoFormatada = this.addPropertyForm.value.descricao.replace(/<[^>]*>/g, '');
      this.addPropertyForm.value.descricao = descricaoFormatada;

      if (this.addPropertyForm.valid) {
        this.propriedadesService.newPropriedade(formData).subscribe(() => {
          this.reset();
          this.toastr.success('Propriedade adicionada com sucesso', '');
          this.router.navigate(['private/admin/list-properties']);
          this.submitted = false;
        }, (err) => {
          console.log(err)
          this.loading = false;
          this.submitted = false;
          this.toastr.error('Ocorreu um erro ao adicionar a Propriedade, tente novamente mais tarde', '');
        });
      } else {
        this.loading = false;
        this.submitted = false;
        this.toastr.error('Preencha os campos obrigatórios', '');
      }
    } else {
      this.propriedadesService.updatePropriedade(this.propertyId, formData).subscribe(() => {
        this.reset();
        this.toastr.success('Propriedade atualizada com sucesso', '');
        this.router.navigate(['private/admin/list-properties']);
        this.submitted = false;
      }, (err) => {
        this.loading = false;
        this.submitted = false;
        this.toastr.error('Ocorreu um erro ao atualizar a Propriedade, tente novamente mais tarde', '');
      });
    }
  }

  reset(): void {
    this.loading = false;
    this.highlightedImagesGallery = [];
    this.highlightedImagesPlantas = [];
    this.addPropertyForm.reset();
  }

  setDataPropriedade() {
    if (!this.isAddMode) {
      this.propriedadesService.getPropriedadeID(this.propertyId).subscribe(data => {

        if (data[0].imagemDestacada) {
          this.highlightedImageDestacada = data[0].imagemDestacada;
        }
        if (data[0].imagens) {
          data[0].imagens.map(img => {
            this.highlightedImagesGallery.push(img);
            this.selectedMultiplesImages.push(img);
          });
        }
        if (data[0].plantas) {
          data[0].plantas.map(planta => {
            this.highlightedImagesPlantas.push(planta);
            this.selectedMultiplesImagesPlantas.push(planta);
          });
        }

        data[0].video ? this.urlVideo = data[0].video : this.urlVideo = [];
       

        this.addPropertyForm.patchValue(data[0]);
        this.addPropertyForm.controls.categorias.patchValue(data[0].categorias);
        this.addPropertyForm.controls.imagens.patchValue(data[0].imagens);
        this.addPropertyForm.controls.plantas.patchValue(data[0].plantas);
        this.addPropertyForm.controls.video.patchValue(data[0].video);
        this.addPropertyForm.controls.endereco.patchValue(data[0].endereco);
        this.selectedCategoriasPropriedades = data[0].categorias;

        setTimeout(() => {
          this.inputCategories.forEach(input => {
            if (data[0].categorias.includes(input.nativeElement.value)) {
              input.nativeElement.checked = true;
            }
          });
        });
      });
    }
  }

  getAddressViaCep(): void {
    const CEP = this.addPropertyForm.controls.endereco.get('cep').value;

    /*this.viacep.buscarPorCep(CEP).subscribe((endereco: Endereco) => {
      this.addPropertyForm.controls.endereco.get('rua').setValue(endereco.logradouro);
      this.addPropertyForm.controls.endereco.get('bairro').setValue(endereco.bairro);
      this.addPropertyForm.controls.endereco.get('cidade').setValue(endereco.localidade);
      this.addPropertyForm.controls.endereco.get('uf').setValue(endereco.uf);
      this.registerDataMarker(endereco);
    });*/
  }

  registerDataMarker(address) {
    let completeAddress = [
      address.logradouro+', '+
      this.addPropertyForm.controls.endereco.get('numero').value +' - '+ 
      address.bairro +', '+
      address.localidade +' - '+
      address.uf +', '+
      address.cep
    ];
    /*this.mapsAPILoader.load().then(() => {;
      this.geoCoder = new google.maps.Geocoder;
      this.geoCoder.geocode({ 'address': completeAddress[0] }, (results, status) => {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        this.addPropertyForm.controls.endereco.get('latitude').setValue(lat);
        this.addPropertyForm.controls.endereco.get('longitude').setValue(lng);
      });
     });*/
  }


  // tslint:disable-next-line: member-ordering
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '1rem',
    placeholder: 'Digite o texto aqui...',
    translate: 'no',
    defaultParagraphSeparator: ' arrayImagens = [];p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
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
