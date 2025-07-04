import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';
import { DepoimentosService } from 'src/app/modules/private/admin/components/depoimentos/services/depoimentos.service';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';
import { PropriedadesService } from 'src/app/modules/private/admin/components/properties/services/propriedades.service';
import { IbgeService } from '../../utils/ibge.service';
import { FiltroService } from '../../utils/filtro.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post>;
  categorias$: Observable<any>;
  banners$: Observable<any>;
  depoimentos$: Observable<any>;
  backgroundDepoimentos = [];
  home = [];
  qtdItens: any;

  estados = [];
  cidades = [];

  filterForm: FormGroup = this.fb.group({
    estado: [''],
    cidade: [''],
    categoria: [''],
    precoMin: [''],
    precoMax: ['']
  });

  constructor(
    private postsService: PostService,
    private editThemeService: EditThemeService,
    private depoimentosService: DepoimentosService,
    private propriedadesService: PropriedadesService,
    private fb: FormBuilder,
    private ibgeService: IbgeService,
    private filtrosService: FiltroService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
    this.banners$ = this.editThemeService.getAllBanners();
    this.depoimentos$ = this.depoimentosService.getAllDepoimentos();
    this.categorias$ = this.propriedadesService.getAllCategoriasPropriedades();
    
    this.getFundoDepoimentos();
    this.getHome();
    this.getEstados();
    this.getCidades();
  }

  getFundoDepoimentos() {
    this.depoimentosService.getFundoDepoimentos().subscribe(fundo => {
      if(fundo) { this.backgroundDepoimentos = fundo; }
    });
  }

  getHome() {
    this.editThemeService.getAllDadosHome().pipe(
              map(d => {
                d[0].secaoNoticias = JSON.parse(d[0].secaoNoticias)
                d[0].secaoOne = JSON.parse(d[0].secaoOne)
                d[0].secaoTwo = JSON.parse(d[0].secaoTwo)
                return d;
              })
            ).subscribe(home => {
      home[0].secaoNoticias.gridNoticias === '3' ? this.qtdItens = 4 : this.qtdItens = 3;
      this.home = home;
    });
  }

  getEstados() {
    this.ibgeService.getEstadosIBGE().subscribe(estados => {
      this.estados = estados;
    });
  }

  getCidades() {
    this.filterForm.controls.estado.valueChanges.subscribe(sigla => {
      this.ibgeService.getCidadesIBGE(sigla).subscribe(cidades => {
        this.cidades = cidades;
      });
    });
  }

  filtrar() {
    this.router.navigate(['/propriedades'], {queryParams: this.filterForm.value});
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: false,
    autoWidth: true,
    navText: ['<i class="bx bxs-chevron-left"></i>', '<i class="bx bxs-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  customOptionsTestimony: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

}
