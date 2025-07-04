import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../guards/auth.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<User>
  userData: any;


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  // CADASTRAR USUÁRIO
  cadastro(user: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/new-user`, user)
    .pipe(
      retry(1),
      map(res => {
        /*this.authService.setDataInLocalStorage('token', res.token);
        this.authService.logged.next(true);
        res.data.tipoUsuario === 'admin' ? this.router.navigate(['private/admin']) : this.router.navigate(['/vereador']);*/
      }),
      catchError(this.handleError)
    );
  }

  //LOGIN
  login(user: User): Observable<User> {
    return this.http.post<any>(`${environment.API_URL}/login`, user)
    .pipe(
      retry(1),
      map(res => {
        this.authService.setDataInLocalStorage('token', res.token);
        this.authService.logged.next(true);
        this.router.navigate(['private/admin']);
      }),
      catchError(this.handleError)
    );
  }

  // OBTER USUÁRIO
  getUser(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getUserAll(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user-all`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteUser(userID): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/user/${userID}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // SAIR
  logout() {
    this.http.post<any>(`${environment.API_URL}/logout`, {})
    .subscribe(() => {
      this.authService.clearStorage();
      this.authService.logged.next(false);
      this.router.navigate(['/login']);
    });
  }

  handleError(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }
}
