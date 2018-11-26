import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from "../entities/api.class";
import { Observable } from 'rxjs';
import { NotificationType } from '../entities/notificationType.class';

@Injectable({
  providedIn: 'root'
})
export class NotificationTypeService {

  constructor(private http: HttpClient) { }

  getTypeById(id):Observable<NotificationType>{
    return this.http.get<NotificationType>(Api.API_URL+'notification-type/'+id);
  }
}
