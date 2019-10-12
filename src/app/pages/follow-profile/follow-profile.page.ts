import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-follow-profile',
  templateUrl: './follow-profile.page.html',
  styleUrls: ['./follow-profile.page.scss']
})
export class FollowProfilePage implements OnInit {
  @Input() following: any;

  constructor() {
    console.log(this.following);
  }

  ngOnInit() {}
}
