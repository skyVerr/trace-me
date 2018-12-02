import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from "../entities/api.class";
import { Observable } from 'rxjs';
import { Group } from '../entities/group.class';

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

}
