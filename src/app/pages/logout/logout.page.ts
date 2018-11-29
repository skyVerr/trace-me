import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    if(this._auth.logout()){
      this.router.navigateByUrl('/login');
    }
  }

}
