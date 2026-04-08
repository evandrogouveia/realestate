import { Component, OnInit } from '@angular/core';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contato = [];

  neighborhoodAndCity: string;
  lat: number = -22.9068;
  lng: number = -43.1729;
  zoom: number = 15;

  constructor(
    private editThemeService: EditThemeService 
    ) { }

  ngOnInit(): void {
    this.editThemeService.getAllDadosContatos().subscribe(contato => {
      contato[0].coluna1 = JSON.parse(contato[0].coluna1);
      contato[0].coluna2 = JSON.parse(contato[0].coluna2);
      contato[0].coluna3 = JSON.parse(contato[0].coluna3);
      contato[0].coluna4 = JSON.parse(contato[0].coluna4);
      contato[0].endereco = JSON.parse(contato[0].endereco);
      this.contato = contato;
      //this.initializeMap(contato[0].endereco);
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

}
