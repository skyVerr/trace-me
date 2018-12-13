import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from "../entities/api.class";
import { Observable } from 'rxjs';
import { User } from '../entities/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserbyId(id):Observable<User>{
    return this.http.get<User>(Api.API_URL+'user/'+id);
  }

  fetchMarker(imageUrl){
    return this.http.get(Api.API_URL+'merge-photo?image='+imageUrl);
  }
}
