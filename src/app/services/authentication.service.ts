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
}
