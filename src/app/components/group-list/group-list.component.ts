import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Group } from '../../entities/group.class';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
