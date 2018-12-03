import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from "@angular/router";
import { MenuController } from '@ionic/angular';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    private socketService: SocketService
    ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  onSubmit(f: NgForm){
    this._auth.signUp({user:f.value}).subscribe(res => {
      // this.nativeStorage.setItem('token',res);
      localStorage.setItem('token',res['token']);
      this.socketService.socket.emit('setId',this._auth.getDecodeToken().user.user_id);
      this.router.navigate(['/home']);
      this.menu.enable(true);
    });
  }

}
