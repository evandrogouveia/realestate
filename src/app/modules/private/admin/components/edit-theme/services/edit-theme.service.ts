import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditThemeService {

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DE BANNERS ***/
  newBanner(banner): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-banner`, banner);
  }
  getAllBanners(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-banners`);
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
    return this.http.get<any>(`${environment.API_URL}/all-banners-paginas`);
  }
  updateBannerPaginas(bannerID, banner): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-banner-paginas/${bannerID}`, banner);
  }

  /*** SERVIÇOS DA HOME ***/
  newDadosHome(home): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-home`, home);
  }
  getAllDadosHome(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-home`);
  }
  updateDadosHome(homeID, home): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-home/${homeID}`, home);
  }

  /*** SERVIÇOS DE CONTATOS ***/
  newDadosContatos(contato): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-contato`, contato);
  }
  getAllDadosContatos(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-contato`);
  }
  updateDadosContatos(contatoID, contato): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-contato/${contatoID}`, contato);
  }

  /*** SERVIÇOS DE QUEM SOMOS ***/
  newQuemSomos(quemSomos): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-quem-somos`, quemSomos);
  }
  getAllQuemSomos(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-quem-somos`);
  }
  updateQuemSomos(quemSomosID, quemSomos): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-quem-somos/${quemSomosID}`, quemSomos);
  }
}
