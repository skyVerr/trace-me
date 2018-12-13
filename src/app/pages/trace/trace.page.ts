import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.page.html',
  styleUrls: ['./trace.page.scss'],
})
export class TracePage implements OnInit {

  usersLocation;

  lat: number;
  lng: number;

  currentLat: number;
  currentLng: number;

  constructor(
    private geolocation: Geolocation, 
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private toastController: ToastController,
    private _auth: AuthenticationService,
    private userService: UserService
    ) {

      this.usersLocation = new Array<any>();

      this.socketService.joinTrace(this.activatedRoute.snapshot.paramMap.get('id'));

      this.socketService.userJoin().subscribe(user=>{
        this.presentToast(user['firstname']+' is now emitting location');
        let location = {
          lat: this.currentLat,
          lng: this.currentLng
        };

        this.socketService.sendLocation(this.activatedRoute.snapshot.paramMap.get('id'),location);
      });

      this.socketService.getUserLeft().subscribe(user=>{
        this.usersLocation = this.usersLocation.filter(e=>e.user.user_id != user.user_id);
      });


      this.socketService.receiveLocation().subscribe(data=>{
        console.log(this._auth.getDecodeToken().user.user_id,  data.user.user_id);
        this.lat = data.location.lat;
        this.lng = data.location.lng;

        this.userService.fetchMarker(data.user.profile_picture).subscribe(res=>{
          data.user.profile_picture = res['result'];
        });

        var sameUserIndex = this.usersLocation.findIndex( userLoc=>{
          return userLoc.user.user_id == data.user.user_id;
        });

        if(sameUserIndex == -1){
          this.usersLocation.push(data);
        } else {
          this.usersLocation[sameUserIndex] = data;
        }
        console.log(sameUserIndex);
        console.log(this.usersLocation.length);
      });

      this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {

        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;

        this.currentLat = resp.coords.latitude;
        this.currentLng = resp.coords.longitude;

        let location = {lat:resp.coords.latitude,lng:resp.coords.longitude};
        this.socketService.sendLocation(this.activatedRoute.snapshot.paramMap.get('id'),location);
        console.log('current location sent');

      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition({enableHighAccuracy: true});
        watch.subscribe((data) => {
        if(data!== undefined){
          this.lat = data.coords.latitude;
          this.lng = data.coords.longitude;
          this.currentLat = data.coords.latitude;
          this.currentLng = data.coords.longitude;
          let location = {lat:data.coords.latitude,lng:data.coords.longitude};
          this.socketService.sendLocation(this.activatedRoute.snapshot.paramMap.get('id'),location);
          console.log('location sent to socket');
        }
      });
    }

  
  
  ngOnInit() {

  }

  ngOnDestroy(){
    //leave the trace id he joined
    this.socketService.socket
      .emit('leave',{
        traceId: this.activatedRoute.snapshot.paramMap.get('id'),
        user: this._auth.getDecodeToken().user
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
