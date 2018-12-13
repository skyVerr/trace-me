import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../entities/group.class';
import { GroupService } from '../../services/group.service';
import { User } from '../../entities/user.class';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.page.html',
  styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {

  group:Group;
  members:User[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.groupService.getGroupById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(group => {
        this.group = group;
        this.loadGroup();
      });
  }

  loadGroup(){
    this.groupService.getUserByGroup(this.group)
    .subscribe(users=>{
      this.members = users;
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'User Email',
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
              this.loadGroup();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
