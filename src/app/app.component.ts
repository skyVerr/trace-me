import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocketService } from "./services/socket.service";
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: 'contact'
    },
    {
      title: 'Notifications',
      url: '/notification',
      icon: 'notifications'
    },{
      title: 'Groups',
      url:'/group',
      icon: 'people'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'power'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socketService: SocketService,
    private toastController: ToastController,
    private auth: AuthenticationService
  ) {
    this.initializeApp();
    this.socketService.newNotification().subscribe(data=>{
      this.presentToast(data.notification);
    });
    
    this.socketService.getIdEvent().subscribe(data=>{
      if(this.auth.loggedIn()){
        this.socketService.socket.emit('setId',this.auth.getDecodeToken().user.user_id);
      }
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
