import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from "../entities/api.class";
import { Observable } from 'rxjs';
import { Group } from '../entities/group.class';
import { User } from '../entities/user.class';
=======
import { HttpClient } from '@angular/common/http';
import { Api } from "../entities/api.class";
import { Observable } from 'rxjs';
import { Group } from '../entities/group.class';
>>>>>>> c60c18a69d36ce8edfa55c7620a2f1b36544c45b

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(group){
    return this.http.post(Api.API_URL+'group',group);
  }

  getGroup():Observable<Group[]>{
    return this.http.get<Group[]>(Api.API_URL+'group');
  }

<<<<<<< HEAD
  getGroupById(id):Observable<Group>{
    return this.http.get<Group>(Api.API_URL+'group/'+id);
  }

  patchGroup(group:Group){
    return this.http.request('patch',Api.API_URL+'group',{
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      }), body: group
    });
  }

  deleteGroup(group:Group){
    return this.http.request('delete',Api.API_URL+'group',{
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      }), body: group
    });
  }

  addUser(group:Group, email){
    return this.http.post(Api.API_URL+'group/'+'user',{})
  }

  getUserByGroup(group:Group):Observable<User[]>{
    return this.http.get<User[]>(Api.API_URL+'group/user/'+group.group_id);
  }

=======
>>>>>>> c60c18a69d36ce8edfa55c7620a2f1b36544c45b
}
