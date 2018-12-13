<<<<<<< HEAD
import { Component, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Group } from '../../entities/group.class';
import { ActionSheetController } from '@ionic/angular';
import { GroupService } from '../../services/group.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Group } from '../../entities/group.class';
>>>>>>> master

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() group: Group;
<<<<<<< HEAD
  @Output() reload: EventEmitter<any> = new EventEmitter();

  constructor(
    private actionSheetController:ActionSheetController,
    private groupService:GroupService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
      {
        text: 'Trace',
        icon: 'locate',
        handler: () => {
          
        }
      },{
        text: 'Members',
        icon: 'people',
        handler: () => {
          this.router.navigateByUrl('/group/'+this.group.group_id);
        }
      },{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.groupService.deleteGroup(this.group)
            .subscribe(data=>{
              console.log(data);
              this.reload.emit(null);
            });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
=======

  constructor() { }

  ngOnInit() {
>>>>>>> master
  }

}
