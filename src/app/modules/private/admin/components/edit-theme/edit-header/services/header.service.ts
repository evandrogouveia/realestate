import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  /*** SERVIÇOS DO HEADER ***/
  newHeader(header): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-header`, header);
  }
  getHeader(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/all-header`);
  }
  updateHeader(headerID, header): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/update-header/${headerID}`, header);
  }
}
