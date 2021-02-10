import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });

  url_base = "http://localhost:3000";

  private _uri: string;

  constructor(public http: HttpClient) {
  }

  get<T>(uri: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.uri = uri;
    this.headers = headers;

    return this.http.get<T>(`${this.url_base}${this._uri}`, {params: params, headers: this._headers})
      .pipe(
        catchError((err, _) => {
          let errorMsg: string;

          if (err.error instanceof ErrorEvent) {
            errorMsg = `Error: ${err.error.message}`;
          } else {
            errorMsg = ApiService.getServerErrorMessage(err);
          }

          return throwError(errorMsg);
        }),
        take(3)
      );
  }

  put<T>(uri: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.uri = uri;
    this.headers = headers;
    return this.http.put<T>(`${this.url_base}${this._uri}`, body, {params: params, headers: this._headers})
  }

  post<T>(uri: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.uri = uri;
    this.headers = headers;
    return this.http.post<T>(`${this.url_base}${this._uri}`, body, {params: params, headers: this._headers})
  }

  delete<T>(uri: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.uri = uri;
    this.headers = headers;
    return this.http.delete<T>(`${this.url_base}${this._uri}`, {params: params, headers: this._headers})
  }

  private static getServerErrorMessage(error: HttpErrorResponse) : string {
    switch (error.error) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }


  set headers(params: HttpHeaders) {
    if (params != null) {
      params.keys().forEach(key => {
        this.headers = this.headers.append(key, params.get(key));
      });
    }
  }

  set uri(uri: string) {
    this._uri = uri.startsWith('/') ? uri : `/${uri}`;
  }
}
