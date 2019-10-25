import { Component, OnInit } from '@angular/core';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor() {
    this.post = {};
    this.post.profilePic = 'assets/images/blank-profile.png';
    this.post.username = 'Crazy Pirate';
    this.post.date = 'Today at 9:00am';
    this.post.statement = 'Now this is a bargan!!!';
    this.post.img = 'assets/images/blank-image.jpg';
    this.post.likes = 12;
    this.post.comments = 3;
    this.post.views = 37;
    this.post.productName = 'CocoPops';
    this.post.price = 2.5;
    this.post.storeName = 'Dunnestores';
    this.post.locality = 'Sligo';
    this.post.expDate = '25/12/2020';
  }

  ngOnInit() {}
}
