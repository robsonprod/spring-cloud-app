import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private api: ApiService) {

  }

  private get authorities(): Observable<any> {
    return this.http.get<any>(`/authenticate`, {headers: this.headers});
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`/authenticate`, {login, password})
      .pipe();
  }
}
