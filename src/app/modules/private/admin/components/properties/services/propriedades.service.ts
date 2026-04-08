import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaPropriedades, Propriedades } from '../models/propriedades.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropriedadesService {

  private propriedadesCache$: Observable<any[]> | null = null;
  private propriedadeIdCache$: Observable<any> | null = null;
  private categoriaPropriedadeCache$: Observable<any> | null = null;

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DE PROPRIEDADESS ***/
  newPropriedade(propriedade): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-propriedade`, propriedade);
  }
  getPropriedadeID(propriedadeID): Observable<Propriedades> {
     if (!this.propriedadeIdCache$) {
      this.propriedadeIdCache$ = this.http.get<any>(`${environment.API_URL}/propriedade/${propriedadeID}`).pipe(shareReplay(1));
    }
    return this.propriedadeIdCache$;
  }
  getAllPropriedades(page: number, limit: number): Observable<any> {
    if (!this.propriedadesCache$) {
      this.propriedadesCache$ = this.http.get<any>(`${environment.API_URL}/all-propriedades?page=${page}&limit=${limit}`).pipe(shareReplay(1));
    }
    return this.propriedadesCache$;
  }
  updatePropriedade(propriedadeID, propriedade): Observable<Propriedades> {
    return this.http.patch<any>(`${environment.API_URL}/update-propriedade/${propriedadeID}`, propriedade);
  }
  deletePropriedade(propriedadeID): Observable<Propriedades> {
    return this.http.delete<any>(`${environment.API_URL}/delete-propriedade/${propriedadeID}`);
  }

  /*** SERVIÇOS DE CATEGORIAS DE PROPRIEDADESS ***/
  newCategoriaPropriedade(categoriaPropriedade): Observable<CategoriaPropriedades> {
    return this.http.post<any>(`${environment.API_URL}/new-categoria-propriedade`, categoriaPropriedade);
  }
  getAllCategoriasPropriedades(): Observable<CategoriaPropriedades> {
     if (!this.categoriaPropriedadeCache$) {
      this.categoriaPropriedadeCache$ = this.http.get<any>(`${environment.API_URL}/all-categoria-propriedades`).pipe(shareReplay(1));
    }
    return this.categoriaPropriedadeCache$;
  }
  updateCategoriaPropriedade(categoriaPropriedadeID, categoriaPropriedade): Observable<CategoriaPropriedades> {
    return this.http.patch<any>(`${environment.API_URL}/update-categoria-propriedade/${categoriaPropriedadeID}`, categoriaPropriedade);
  }
  deleteCategoriaPropriedade(categoriaPropriedadeID): Observable<CategoriaPropriedades> {
    return this.http.delete<any>(`${environment.API_URL}/delete-categoria-propriedade/${categoriaPropriedadeID}`);
  }
}
