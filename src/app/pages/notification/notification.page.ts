import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../entities/notification.class';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  private notifications:Notification[];

  constructor(
    private notificationService: NotificationService,
    private socketService: SocketService
    ) {
      this.socketService.newNotification().subscribe(data=>{
        this.loadNotification();
      });
  }

  ngOnInit() {
    this.loadNotification();
  }
  
  private loadNotification(){
    this.notificationService.getNotifications().subscribe(res => this.notifications= res);
  }

}
