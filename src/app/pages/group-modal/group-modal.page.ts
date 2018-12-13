import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../entities/group.class';
import { GroupService } from '../../services/group.service';
import { User } from '../../entities/user.class';

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
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.groupService.getGroupById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(group => {
        this.group = group;
        this.groupService.getUserByGroup(this.group)
          .subscribe(users=>{
            this.members = users;
          });
      });
  }

}
