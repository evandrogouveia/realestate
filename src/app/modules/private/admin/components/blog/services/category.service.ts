import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DE CATEGORIAS DE POSTS ***/
  newCategoria(categoria): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-categoria`, categoria);
  }
  getAllCategorias(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-categorias`);
  }
  updateCategoria(categoriaID, categoria): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-categoria/${categoriaID}`, categoria);
  }
  deleteCategoria(categoriaID): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/delete-categoria/${categoriaID}`);
  }
}
