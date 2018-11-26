import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private auth: AuthenticationService) { }

  intercept(req,next){
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
