import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { Api } from "../entities/api.class";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket = io(Api.API_URL);

  constructor() { }

  newNotification(){
    let observable = new Observable<{notification:String}>(observer => {
      this.socket.on('new notification', (data)=>{
        observer.next(data);
      });
    });

    return observable;
  }
}
