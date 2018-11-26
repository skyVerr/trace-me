import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private menu: MenuController
    ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  onSubmit(f:NgForm){
    this._auth.login(f.value).subscribe(res=>{
      localStorage.setItem('token',res['token']);
      this.menu.enable(true);
      this.router.navigate(['/home']);
    }, err=>{
      console.log('pasok?');
      this.presentAlert();
      f.reset();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Error',
      message: 'Invalid username/password',
      buttons: ['OK']
    });

    await alert.present();
  }

}
