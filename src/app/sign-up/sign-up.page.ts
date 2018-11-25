import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
    console.log(f.value.password);
    this._auth.signUp({user:f.value}).subscribe(res => {
      console.log(res);
    });
  }

}
