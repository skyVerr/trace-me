import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { Api } from "../entities/api.class";
import { AuthenticationService } from './authentication.service';
import { User } from '../entities/user.class';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket = io(Api.API_URL);

  constructor(private _auth: AuthenticationService) { }

  newNotification(){
    let observable = new Observable<{notification:String}>(observer => {
      this.socket.on('new notification', (data)=>{
        observer.next(data);
      });
    });

    return observable;
  }

  joinTrace(traceId){
   this.socket.emit('join',{traceId, user: this._auth.getDecodeToken().user});
  }

  getUserLeft(){
    let observable = new Observable<any>(observer => {
      this.socket.on('user left', (data)=>{
        observer.next(data);
      });
    });

    return observable;
  }

  getIdEvent(){
    let observable = new Observable<any>(observer => {
      this.socket.on('getId', (data)=>{
        observer.next(data);
      });
    });

    return observable;
  }

  userJoin(){
    let observable = new Observable<{user: User}>(observer => {
      this.socket.on('user join', (data)=>{
        observer.next(data);
      });
    });

    return observable;
  }


  receiveLocation(){
    let observable = new Observable<any>(observer => {
      this.socket.on('receive location', (data)=>{
        observer.next(data);
      });
    });

    return observable;
  }

  sendLocation(traceId,location){
    this.socket.emit('location',{traceId,user:this._auth.getDecodeToken().user, location});
  }
}
