import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocketService } from "./services/socket.service";

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
      icon: 'contacts'
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
    private toastController: ToastController
  ) {
    this.initializeApp();
    this.socketService.newNotification().subscribe(data=>{
      this.presentToast(data.notification);
    });

    // this.socketService.traceReq().subscribe(data=>{
    //   this.presentToast(data.notification);
    // });
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
