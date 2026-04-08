import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';
import { PropriedadesService } from 'src/app/modules/private/admin/components/properties/services/propriedades.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  properties$: Observable<Propriedades>;
  propertyId$: Observable<Propriedades>;

  propriedadeID = [];

  url: any;
  items: GalleryItem[];
  itemsPlans: GalleryItem[];

  bsInlineValue = new Date();

  neighborhoodAndCity: string;
  lat: number = -22.9068;
  lng: number = -43.1729;
  zoom: number = 15;

  private geoCoder;

  currentPage: number = 1;
  itemsPerPage: number = 12;
  loading = true;

  themeConfigSkeletonImage = {
    width: '100%',
    height: '100px',
    position: 'relative',
    left: '0',
    border: '1px solid #fff',
    display: 'block'
  }

  constructor(
    //private mapsAPILoader: MapsAPILoader,
    private propriedadesService: PropriedadesService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllPropriedades();
    this.getPropriedade();
    this.url = window.location.href;
  }

  getAllPropriedades() {
    this.properties$ = this.propriedadesService.getAllPropriedades(this.currentPage, this.itemsPerPage).pipe(
      map((d: any) => {

        return d.results.map(item => {

          const dados = item;

          dados.categorias = this.parseIfNeeded(dados.categorias)
          dados.endereco = this.parseIfNeeded(dados.endereco)
          dados.imagens = this.parseIfNeeded(dados.imagens)
          dados.plantas = this.parseIfNeeded(dados.plantas)
          dados.video = this.parseIfNeeded(dados.video)

          return item;
        });
      })
    )
  }

  getPropriedade() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.propriedadesService.getPropriedadeID(propertyId).pipe(
      map((d: any) => {
        const item = d[0];

        item.categorias = this.parseIfNeeded(item.categorias)
        item.endereco = this.parseIfNeeded(item.endereco)
        item.imagens = this.parseIfNeeded(item.imagens)
        item.plantas = this.parseIfNeeded(item.plantas)
        item.video = this.parseIfNeeded(item.video)

        return d;
      })
    ).subscribe((p: any) => {
      this.getGalleryTop(p);
      this.getGalleryPlans(p);
      this.propriedadeID = p;
      this.initializeMap(p[0].endereco);
      setTimeout(() => {
        this.loading = false;
      }, 100);
    });
  }

  parseIfNeeded(value: any) {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }

  /* INICIALIZAR DADOS DO MAPA */
  initializeMap(address): void {
    /*this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      if (address) {
        this.neighborhoodAndCity = address.bairro + ', ' + address.cidade;
        this.geoCoder.geocode({ 'address': this.neighborhoodAndCity }, (res) => {
          if (res[0]) {
            this.lat = res[0].geometry.location.lat();
            this.lng = res[0].geometry.location.lng();
            this.zoom = 15;
          }
        });
      }
    });*/
  }

  // OBTER ENDEREÇO
  getAddress(latitude, longitude): void {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          //this.address = results[0].formatted_address;
          //this.city = results[0].address_components[4].long_name;
          //this.uf = results[0].address_components[4].short_name;
        } else {
          window.alert('Não encontramos nenhum resultado');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }



  getGalleryTop(p) {
    const dataGallery = p[0].imagens;
    this.items = dataGallery.map(item => new ImageItem({
      src: item, thumb: item
    }));

    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });
    lightboxRef.load(this.items);
  }

  getGalleryPlans(p) {
    const dataPlantas = p[0].plantas;
    if (dataPlantas) {
      this.itemsPlans = dataPlantas.map(item => new ImageItem({
        src: item, thumb: item
      }));
    }

    const galleryBoxRef = this.gallery.ref('gallery-plans');

    galleryBoxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumb: false,
      counter: false,
      loop: true,
    });
    galleryBoxRef.load(this.itemsPlans);
  }

}
