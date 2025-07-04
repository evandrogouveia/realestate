import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/modules/login/model/user.model';

import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  alertCtrl:any = Object;

  constructor(
    private http: HttpClient
    ) {}

 

  addUser(user: any): Observable<User>{
    return this.http.post<User>(`${environment.API_URL}/new-user`, user);
  }  

  // GET USER
  getUser(): Observable<User> {
    return this.http.get<any>(`${environment.API_URL}/user`);
  } 

  // GET USER BY ID
  getUserById(userID): Observable<User> {
    return this.http.get<any>(`${environment.API_URL}/user/${userID}`);
  } 
  
  // GET USERS ALL
  getUsers(): Observable<any>  {
    return this.http.get<any>(`${environment.API_URL}/all-user`);
  } 

  //UPDATE USER
  updateUser(userID, user): Observable<User> {
    return this.http.patch<User>(`${environment.API_URL}/update-user/${userID}`, user);
  }

  //DELETE USER
  deleteUser(u: any): Observable<any> {
    return this.http.delete<User>(`${environment.API_URL}/delete-user/${u.ID}`);
  }
  
}
