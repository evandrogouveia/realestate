import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCache$: Observable<any> | null = null;

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DE CATEGORIAS DE POSTS ***/
  newCategoria(categoria): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-categoria`, categoria);
  }
  getAllCategorias(): Observable<any> {
    if (!this.categoryCache$) {
      this.categoryCache$ = this.http.get<any>(`${environment.API_URL}/all-categorias`).pipe(shareReplay(1));
    }
    return this.categoryCache$;
  }
  updateCategoria(categoriaID, categoria): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-categoria/${categoriaID}`, categoria);
  }
  deleteCategoria(categoriaID): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/delete-categoria/${categoriaID}`);
  }
}
