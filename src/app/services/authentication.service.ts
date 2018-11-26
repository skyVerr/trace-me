import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http/";
import { Api } from "../entities/api.class";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http: HttpClient) { }

  signUp(user){
    return this.http.post(Api.API_URL+'sign-up',user);
  }

  login(user){
    return this.http.post(Api.API_URL+'login',user);
  }

  loggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
