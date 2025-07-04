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
  lat: number;
  lng: number;
  zoom: number;

  private geoCoder;

  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(
    //private mapsAPILoader: MapsAPILoader,
    private propriedadesService: PropriedadesService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.properties$ = this.propriedadesService.getAllPropriedades(this.currentPage, this.itemsPerPage).pipe(
      map((d: any) => {

        return d.results.map(item => {
          item.categorias = JSON.parse(item.categorias)
          item.endereco = JSON.parse(item.endereco)
          item.imagens = JSON.parse(item.imagens)
          item.plantas = JSON.parse(item.plantas)
          item.video = JSON.parse(item.video)
          return item;
        });


      })
    )
    this.url = window.location.href;
    this.getPropriedade();
  }

  getPropriedade() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.propriedadesService.getPropriedadeID(propertyId).pipe(
      map((d: any) => {
        d[0].categorias = JSON.parse(d[0].categorias)
        d[0].endereco = JSON.parse(d[0].endereco)
        d[0].imagens = JSON.parse(d[0].imagens)
        d[0].plantas = JSON.parse(d[0].plantas)
        d[0].video = JSON.parse(d[0].video)
        return d;
      })
    ).subscribe((p: any) => {
      this.getGalleryTop(p);
      this.getGalleryPlans(p);
      this.propriedadeID = p;
      this.initializeMap(p[0].endereco);
    });
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
