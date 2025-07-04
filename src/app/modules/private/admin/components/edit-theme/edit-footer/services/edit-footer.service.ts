import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditFooterService {

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DO FOOTER ***/
  newFooter(footer): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-footer`, footer);
  }
  getFooter(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-footer`);
  }
  updateFooter(footerID, footer): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-footer/${footerID}`, footer);
  }
}
