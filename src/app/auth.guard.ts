import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SocketService } from './services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private _auth: AuthenticationService,
    private socketService: SocketService
     ) {}

  canActivate():boolean{
    if (this._auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
