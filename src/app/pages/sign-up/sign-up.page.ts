import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from "@angular/router";
import { MenuController, ActionSheetController } from '@ionic/angular';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  chosenPicture:string = "assets/default.png";
  imageFile;

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
    let formData = new FormData();

    Object.keys(f.value).forEach(e =>{
      formData.append(e,f.value[e]);
    });
    if(!!this.imageFile){
      formData.append('profile_picture',this.imageFile);
    }

    this._auth.signUp(formData).subscribe(res => {
      // this.nativeStorage.setItem('token',res);
      localStorage.setItem('token',res['token']);
      this.socketService.socket.emit('setId',this._auth.getDecodeToken().user.user_id);
      this.router.navigate(['/home']);
      this.menu.enable(true);
    });

  }

  // async onClickPhoto(){
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Choose photo',
  //     buttons: [{
  //       text: 'Choose from gallery',
  //       icon: 'images',
  //       handler: () => {

  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  imageInputChange(event){
    this.chosenPicture = URL.createObjectURL(event.target.files[0]);
    this.imageFile = event.target.files[0];
  }


}
