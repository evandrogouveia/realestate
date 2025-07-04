import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';
import { PropriedadesService } from 'src/app/modules/private/admin/components/properties/services/propriedades.service';
import { FiltroService } from '../../../utils/filtro.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-cards-properties',
  templateUrl: './cards-properties.component.html',
  styleUrls: ['./cards-properties.component.scss']
})
export class CardsPropertiesComponent implements OnInit {
  @Input() hasPaginator: boolean;
  @Input() dataHome: any;

  properties = [];
  contentArray: any = [];
  returnedArray: Propriedades[];
  loading = false;

  currentPage: number = 1;
  @Input() itemsPerPage: number = 8;
  totalItems = 0;
  home = [];
  hasParams = false;

  themeConfigSkeletonImage = {
    width: '100%',
    height: '170px',
    position: 'absolute',
    left: '0',
    'border-radius': '10px 10px 0 0'
  }


  themeConfigSkeletonTitulo = {
    width: '85%',
    height: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'border-radius': '10px'
  }

  themeConfigSkeletonEndereco = {
    width: '85%',
    height: '20px',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'border-radius': '10px'
  }

  themeConfigSkeletonOpcoes = {
    width: '85%',
    height: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'border-radius': '10px'
  }

  constructor(
    private propriedadesService: PropriedadesService,
    private router: Router,
    private route: ActivatedRoute,
    private editThemeService: EditThemeService,
    private filtrosService: FiltroService
  ) { }

  ngOnInit(): void {
    this.getPropriedadesFiltradas();
    this.getDadosHome();
  }

  getDadosHome() {
    this.editThemeService.getAllDadosHome().pipe(
              map(d => {
                d[0].secaoNoticias = JSON.parse(d[0].secaoNoticias)
                d[0].secaoOne = JSON.parse(d[0].secaoOne)
                d[0].secaoTwo = JSON.parse(d[0].secaoTwo)
                return d;
              })
            ).subscribe(home => {
      console.log(home)
      this.home = home;
    });
  }

  getPropriedadesFiltradas() {
    this.hasParams = false;
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.hasParams = true;
        this.filtrosService.filtroPropriedades(this.currentPage, this.itemsPerPage, params).subscribe(res => {
          this.properties = res.results;
          this.totalItems = res.totalItems;
        });
      } else {
        this.getPropertiesPagination();
      }
    });
  }

  getPropertiesPagination() {
    this.loading = true;
    this.propriedadesService.getAllPropriedades(this.currentPage, this.itemsPerPage).pipe(
      map((d: any) => {
        console.log(d)
          this.totalItems = d.totalItems;
        return d.results.map(item => {
          item.categorias = JSON.parse(item.categorias)
          item.endereco = JSON.parse(item.endereco)
          item.imagens = JSON.parse(item.imagens)
          item.plantas = JSON.parse(item.plantas)
          item.video = JSON.parse(item.video)
          return item;
        });

        
      })
    ).subscribe(data => {
      this.properties = data;
   
      this.loading = false;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 1150);
    this.currentPage = event.page;
    this.getPropertiesPagination();
  }

  routerLinkId(idProperty) {
    this.router.navigate([`/propriedades/${idProperty}`]);
  }

}
