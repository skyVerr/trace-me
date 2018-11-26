import { Component, OnInit } from '@angular/core';
import { Contact } from "../../entities/contact.class";
import { User } from '../../entities/user.class';
import { UserService } from '../../services/user.service';
import { Input } from '@angular/core';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input() contact:Contact;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserbyId(this.contact.friend_id).subscribe(res=>{
      this.user = res;
    });
  }

}
