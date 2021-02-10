import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Paginate } from "../../models/paginate.model";
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _uri: string;

  constructor(private api: ApiService) { }

  public sendGetRequest(){
    return this.api.get(`/users/`);
  }

  findById(id: string): Observable<any> {
    return this.api.get<any>(`/users/${id}`);
  }

  paginate(page: number = 0, params?: HttpParams): Observable<Paginate<any>> {
    return this.api.get<Paginate<any>>(`/users?page=${page}`, params);
  }

}
