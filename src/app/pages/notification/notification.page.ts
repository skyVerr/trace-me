import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../entities/notification.class';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  private notifications:Notification[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(res => this.notifications= res);
  }

}
