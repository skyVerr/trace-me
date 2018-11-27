import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Input } from "@angular/core";
import { NotificationTypeService } from '../../services/notification-type.service';
import { Notification } from '../../entities/notification.class';
import { User } from '../../entities/user.class';

@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  @Input() notification:Notification;
  message:String;
  type:String;
  user: User;
  from: User;

  constructor(
    private userService:UserService,
    private notiTypeService:NotificationTypeService
    ) { }

  ngOnInit() {
    this.notiTypeService.getTypeById(this.notification.notification_type_id).subscribe(
      res=>{
        this.type = res.type;
        this.userService.getUserbyId(this.notification.from_user_id).subscribe(
          res2 => {
            this.from = res2;
            if(res.notification_type_id == 1){
              this.message = `${this.from.firstname} ${this.from.lastname} wants to add you`;
            }
        });
    });
  } 

  

}
