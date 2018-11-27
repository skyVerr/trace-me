import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http/";
import { Api } from "../entities/api.class";
import * as jwt from "jwt-decode";

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

  getDecodeToken(){
    try{
      return jwt(this.getToken());
    }
    catch(Error){
        return null;
    }
  }
}
