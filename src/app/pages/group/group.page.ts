import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroupService } from '../../services/group.service';
import { Group } from '../../entities/group.class';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  groups: Group[];

  constructor(
    private alertController: AlertController,
    private groupService: GroupService
    ) { }

  ngOnInit() {
    this.loadGroup();
  }

  loadGroup(){
    this.groupService.getGroup()
      .subscribe(data=>{
        this.groups = data;
        console.log(this.groups);
      });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Group name',
      inputs: [
        {
          name: 'name',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.groupService.createGroup(data).subscribe(data=>{
              console.log(data);
            });
          }
        }
      ]
    });

    await alert.present();
  }
  

}
