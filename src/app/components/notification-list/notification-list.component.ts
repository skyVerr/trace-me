import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Input, Output } from "@angular/core";
import { NotificationTypeService } from '../../services/notification-type.service';
import { Notification } from '../../entities/notification.class';
import { User } from '../../entities/user.class';
import { ContactsService } from '../../services/contacts.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  @Input() notification:Notification;
  @Output() reload: EventEmitter<any> = new EventEmitter();
  message:String;
  type:String;
  user: User;
  from: User;

  constructor(
    private userService:UserService,
    private notiTypeService:NotificationTypeService,
    private contactService:ContactsService,
    private notificationService:NotificationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.notiTypeService.getTypeById(this.notification.notification_type_id).subscribe(
      res=>{
        this.type = res.type;
        this.userService.getUserbyId(this.notification.from_user_id).subscribe(
          res2 => {
            this.from = res2;
            if(res.notification_type_id == 1){
              this.message = ` ${this.from.firstname} ${this.from.lastname} wants to add you`;
            }
        });
    });
  } 

  confirm(){
    if(this.notification.notification_type_id ==1){
      this.notification.isConfirm = true;
      this.contactService.postContactConfirm({notification: this.notification}).subscribe();
    }
    if(this.notification.notification_type_id ==2){
      this.notificationService.declineNotification(this.notification).subscribe(data=>{
        this.router.navigateByUrl('/trace/s'+this.notification.user_id);
      });
    }
  }

  decline(){
    if(this.notification.notification_type_id ==1){
      this.notification.isConfirm = false;
      this.contactService.postContactConfirm({notification: this.notification}).subscribe();
    }
    if(this.notification.notification_type_id ==2){
      this.notificationService.declineNotification(this.notification).subscribe(data=>{
        this.reload.emit(null);
      });
    }
  }

  

}
