import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Api } from "../entities/api.class";
import { Notification } from '../entities/notification.class';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(
    private http: HttpClient
    ) {}

  getNotifications():Observable<Notification[]>{
    return this.http.get<Notification[]>(Api.API_URL+'notification');
  }


}
