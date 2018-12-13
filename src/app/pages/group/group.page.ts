<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GroupService } from '../../services/group.service';
import { Group } from '../../entities/group.class';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroupService } from '../../services/group.service';
import { Group } from '../../entities/group.class';
>>>>>>> master

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  groups: Group[];

  constructor(
    private alertController: AlertController,
<<<<<<< HEAD
    private groupService: GroupService,
    private changeDetectionRef:ChangeDetectorRef,
    private router: Router
=======
    private groupService: GroupService
>>>>>>> master
    ) { }

  ngOnInit() {
    this.loadGroup();
  }

  loadGroup(){
    this.groupService.getGroup()
      .subscribe(data=>{
        this.groups = data;
<<<<<<< HEAD
        this.changeDetectionRef.detectChanges();
      });
  }


  onReload(){
    this.loadGroup();
  }

=======
        console.log(this.groups);
      });
  }

>>>>>>> master
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
<<<<<<< HEAD
              this.loadGroup();
=======
              console.log(data);
>>>>>>> master
            });
          }
        }
      ]
    });

    await alert.present();
  }
  

}
