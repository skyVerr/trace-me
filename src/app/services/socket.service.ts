import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket = io('http://localhost:8080');

  constructor() { }
}
