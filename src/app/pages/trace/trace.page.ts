import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.page.html',
  styleUrls: ['./trace.page.scss'],
})
export class TracePage implements OnInit {

  lat: number = 14.8386;
  lng: number = 120.2842;

  contactLat: number;
  contactLng: number;
  contactName: string = 'testing';

  traceId:number;

  constructor(
    private geolocation: Geolocation, 
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private toastController: ToastController,
    private _auth: AuthenticationService
    ) {
      this.socketService.userJoin().subscribe(user=>{
        this.presentToast(user['firstname']+' is now emitting location');
      });

      this.socketService.receiveLocation().subscribe(data=>{
        console.log(this._auth.getDecodeToken().user.user_id,  data.user.user_id);
        
        if(this._auth.getDecodeToken().user.user_id == data.user.user_id){
          this.lat = data.location.lat;
          this.lng = data.location.lng;
        } else {
          this.contactLat = data.location.lat;
          this.contactLng = data.location.lng;
          this.contactName = data.user.firstname;
          console.log(data);
        }
      });
    }
  
  ngOnInit() {
    this.traceId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.socketService.joinTrace(this.traceId);

    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      let location = {lat:resp.coords.latitude,lng:resp.coords.longitude};
      this.socketService.sendLocation(this.traceId,location);
      console.log('current location sent');
    }).catch((error) => {
      console.log('Error getting location', error);
    });

   let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
      if(data!== undefined){
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
        let location = {lat:data.coords.latitude,lng:data.coords.longitude};
        this.socketService.sendLocation(this.traceId,location);
        console.log('send location');
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
