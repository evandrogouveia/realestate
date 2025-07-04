import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private http: HttpClient) { }
  
  filtroPropriedades(page: number, limit: number, filtros: any): Observable<any> {
    let params = new HttpParams();

    Object.keys(filtros).forEach(key => {
      params = params.append(key, filtros[key]);
    });

    return this.http.get<any[]>(`${environment.API_URL}/propriedades?page=${page}&limit=${limit}`, { params });
  }
}
