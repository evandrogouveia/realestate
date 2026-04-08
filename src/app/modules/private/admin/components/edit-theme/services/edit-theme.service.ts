import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditThemeService {

  private bannerCache$: Observable<any[]> | null = null;
  private bannerPaginasCache$: Observable<any[]> | null = null;
  private dadosHomeCache$: Observable<any[]> | null = null;
  private dadosContatosCache$: Observable<any[]> | null = null;
  private quemSomosCache$: Observable<any[]> | null = null;

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DE BANNERS ***/
  newBanner(banner): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-banner`, banner);
  }
  getAllBanners(): Observable<any> {
    if (!this.bannerCache$) {
      this.bannerCache$ = this.http.get<any>(`${environment.API_URL}/all-banners`).pipe(shareReplay(1));
    }
    return this.bannerCache$;
  }
  updateBanner(bannerID, banner): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-banner/${bannerID}`, banner);
  }
  deleteBanner(bannerID): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/delete-banner/${bannerID}`);
  }


  /*** SERVIÇOS DE BANNER DE PAGINAS ***/
  newBannerPaginas(banner): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-banner-paginas`, banner);
  }
  getAllBannerPaginas(): Observable<any> {
    if (!this.bannerPaginasCache$) {
      this.bannerPaginasCache$ = this.http.get<any>(`${environment.API_URL}/all-banners-paginas`).pipe(shareReplay(1));
    }
    return this.bannerPaginasCache$;
  }
  updateBannerPaginas(bannerID, banner): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-banner-paginas/${bannerID}`, banner);
  }

  /*** SERVIÇOS DA HOME ***/
  newDadosHome(home): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-home`, home);
  }
  getAllDadosHome(): Observable<any> {
     if (!this.dadosHomeCache$) {
      this.dadosHomeCache$ = this.http.get<any>(`${environment.API_URL}/all-home`).pipe(shareReplay(1));
    }
    return this.dadosHomeCache$;
  }
  updateDadosHome(homeID, home): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-home/${homeID}`, home);
  }

  /*** SERVIÇOS DE CONTATOS ***/
  newDadosContatos(contato): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-contato`, contato);
  }
  getAllDadosContatos(): Observable<any> {
    if (!this.dadosContatosCache$) {
      this.dadosContatosCache$ = this.http.get<any>(`${environment.API_URL}/all-contato`).pipe(shareReplay(1));
    }
    return this.dadosContatosCache$;
  }
  updateDadosContatos(contatoID, contato): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-contato/${contatoID}`, contato);
  }

  /*** SERVIÇOS DE QUEM SOMOS ***/
  newQuemSomos(quemSomos): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-quem-somos`, quemSomos);
  }
  getAllQuemSomos(): Observable<any> {
    if (!this.quemSomosCache$) {
      this.quemSomosCache$ = this.http.get<any>(`${environment.API_URL}/all-quem-somos`).pipe(shareReplay(1));
    }
    return this.quemSomosCache$
  }
  updateQuemSomos(quemSomosID, quemSomos): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-quem-somos/${quemSomosID}`, quemSomos);
  }
}
