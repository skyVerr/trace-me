import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from "@angular/router";
import { MenuController, ActionSheetController } from '@ionic/angular';
import { SocketService } from '../../services/socket.service';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  chosenPicture:string = "assets/default.png";

  constructor(
    private _auth: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    private socketService: SocketService,
    private camera: Camera,
    private actionSheetController: ActionSheetController
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

  async onClickPhoto(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose photo',
      buttons: [{
        text: 'Take a picture',
        icon: 'camera',
        handler: () => {
          this.takePhoto(1);
        }
      }, {
        text: 'Choose from gallery',
        icon: 'images',
        handler: () => {
          this.takePhoto(0);
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto(sourceType:number){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData);     
    }, (err) => {
      // Handle error
    });

  }

}
