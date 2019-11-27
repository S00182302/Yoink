import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';
import { User } from 'src/app/models/user';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;
  serverUrl: string;
  postImage: string = 'assets/images/blank-image.jpg';
  auth: any;
  touchTime: number;
  favSelectedIndex: any;
  likeSelectedIndex: any;
  postLikedAnim: Boolean;
  isPostLiked: Boolean;

  constructor(
    private localStorage: StoredataService,
    private yoinkService: YoinkService,
    private router: Router
  ) {}

  favouritePost = post => {
    this.yoinkService
      .favouritePost(this.auth.id, post._id, this.auth.token)
      .subscribe(
        res => {
          console.log(res['message']);
        },
        error => {
          console.log(error.error.message);
        }
      );
    this.favSelectedIndex = this.index;
  };

  likePost = async post => {
    if (this.touchTime == 0) {
      // set first click
      this.touchTime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchTime < 400) {
        // double click occurred
        this.touchTime = 0;

        await this.yoinkService
          .likePost(this.auth.id, post._id, this.auth.token)
          .subscribe(
            res => console.log(res),
            error => console.log(error.error.message)
          );

        this.postLikedAnim = true;
        const userHasLiked = post.likedBy.includes(this.auth.id);
        !userHasLiked ? post.likes++ : post.likes;

        this.likeSelectedIndex = this.index;
        console.log('post index:', this.index);
      } else {
        // not a double click so set as a new first click
        this.touchTime = new Date().getTime();
      }
    }
  };

  setImageUrl() {
    if (this.post.imageUrl == '' || this.post.imageUrl == undefined) {
      // do nothing
    } else {
      this.postImage = this.post.imageUrl.replace('assets/', '');
      this.postImage = this.yoinkService.serverUrl + this.postImage;
    }
    return false;
  }

  async ngOnInit() {
    this.auth = await this.localStorage.getAuth();
    this.setImageUrl();
  }
}
