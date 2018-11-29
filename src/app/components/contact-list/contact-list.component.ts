import { Component, OnInit, Output } from '@angular/core';
import { Contact } from "../../entities/contact.class";
import { User } from '../../entities/user.class';
import { UserService } from '../../services/user.service';
import { Input } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ContactsService } from '../../services/contacts.service';
import { EventEmitter } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../entities/notification.class';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input() contact:Contact;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  user: User;

  constructor(
    private userService: UserService,
    private actionSheetController:ActionSheetController,
    private contactService:ContactsService,
    private notificationService: NotificationService,
    private auth: AuthenticationService,
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
    this.userService.getUserbyId(this.contact.friend_id).subscribe(res=>{
      this.user = res;
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Contact',
      buttons: [
      {
        text: 'Trace',
        icon: 'locate',
        handler: () => {
          let notification = {
            user_id: this.user.user_id,
            notification_type_id: 2,
            from_user_id: this.auth.getDecodeToken().user.user_id,
            message: this.auth.getDecodeToken().user.firstname +' wants to trace you'
          };
          this.notificationService.postNotification(notification).subscribe(data=>{
            this.toastController.create({
              message: 'Trace notification is sent',
              duration: 2000
            })
            .then(toast=>{
              toast.present();
              this.router.navigateByUrl('/trace/s'+this.user.user_id);
            });
          });
        }
      },{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.contactService.deleteContact(this.contact).subscribe(data=>{
            this.delete.emit(null);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  

}
