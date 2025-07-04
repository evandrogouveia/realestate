import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepoimentosService {

  constructor(private http: HttpClient) { }
  /*** SERVIÇOS DE BACKGROUND DE DEPOIMENTOS ***/
  newFundoDepoimento(background): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-background-depoimento`, background);
  }
  getFundoDepoimentos(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-background-depoimentos`);
  }
  updateFundoDepoimento(backgroundID, background): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-background-depoimento/${backgroundID}`, background);
  }

  /*** SERVIÇOS DE DEPOIMENTOS ***/
  newDepoimento(depoimento): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-depoimento`, depoimento);
  }
  getAllDepoimentos(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-depoimentos`);
  }
  updateDepoimento(depoimentoID, depoimento): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-depoimento/${depoimentoID}`, depoimento);
  }
  deleteDepoimento(depoimentoID): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/delete-depoimento/${depoimentoID}`);
  }



}
