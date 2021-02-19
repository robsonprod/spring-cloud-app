import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });

  apiURL: string = environment.apiURLBase;
  tokenURL: string =  environment.apiURLBase + environment.obterTokenUrl;

  constructor(private http: HttpClient) {

  }

  signIn(name: string, login: string, email: string, password: string): Observable<any>{
    return this.http.post(environment.apiURLBase ,
        {name, login, email, password},
      {headers: this._headers})
      .pipe();
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`/authenticate`,
      {login, password},
      {headers: this._headers})
      .pipe();
  }
}
