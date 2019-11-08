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
  @Input() posts: Post[];
  auth: any;
  favSelectedIndex: any;
  likeSelectedIndex: any;
  touchTime: number = 0;
  postLikedAnim: Boolean;
  isPostLiked: Boolean;

  constructor(
    private localStorage: StoredataService,
    private yoinkService: YoinkService,
    private router: Router
  ) {}

  favouritePost = (post, index) => {
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
    this.favSelectedIndex = index;
  };

  // goToPostUploaderProfile = post => {
  //   console.log('Post id from home:', post.user_id);
  //   // console.log('Post id from favourites:', post.user_id._id);
  //   this.router.navigateByUrl('/tabs/follow-profile', post.user_id);
  // };

  likePost = async (post, index) => {
    if (this.touchTime == 0) {
      // set first click
      this.touchTime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchTime < 800) {
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

        this.likeSelectedIndex = index;
      } else {
        // not a double click so set as a new first click
        this.touchTime = new Date().getTime();
      }
    }
  };

  async ngOnInit() {
    this.auth = await this.localStorage.getAuth();
  }
}
