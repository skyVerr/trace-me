import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GroupService } from '../../services/group.service';
import { Group } from '../../entities/group.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  groups: Group[];

  constructor(
    private alertController: AlertController,
    private groupService: GroupService,
    private changeDetectionRef:ChangeDetectorRef,
    private router: Router
    ) { }

  ngOnInit() {
    this.loadGroup();
  }

  loadGroup(){
    this.groupService.getGroup()
      .subscribe(data=>{
        this.groups = data;
        this.changeDetectionRef.detectChanges();
      });
  }


  onReload(){
    this.loadGroup();
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
              this.loadGroup();
            });
          }
        }
      ]
    });

    await alert.present();
  }
  

}
