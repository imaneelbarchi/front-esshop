import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { Page } from '../model/page.model';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  host:string="http://localhost:8087/api";

  constructor(private http:HttpClient ) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.host+"/users/"+id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/users`);
  }
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.host+"/users/"+id);
  }



}
