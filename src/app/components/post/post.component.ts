import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post';
import { User } from 'src/app/models/user';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() user: User;
  posts: Post[];
  @Input() test: Post[] = [];
  selectedIndex: any;
  touchTime: number = 0;
  postLikedAnim: Boolean;

  constructor(
    private localStorage: StoredataService,
    private yoinkService: YoinkService
  ) {}

  likePost = async (post, index) => {
    if (this.touchTime == 0) {
      // set first click
      this.touchTime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchTime < 800) {
        // double click occurred
        this.touchTime = 0;
        console.log(post.likes);
        console.log(post._id);

        const auth = await this.localStorage.getAuth();

        await this.yoinkService
          .likePost(auth.id, post._id, auth.token)
          .subscribe(
            res => console.log(res),
            error => console.log(error.error.message)
          );

        this.postLikedAnim = true;

        this.selectedIndex = index;
      } else {
        // not a double click so set as a new first click
        this.touchTime = new Date().getTime();
      }
    }
  };

  ngOnInit() {
    if (this.user != null) this.posts = this.user.savedPosts;
    if (this.user == null) this.posts = this.test;
    console.log('Posts in Post Component:', this.posts);
    console.log('User in Post Component:', this.user);
  }
}
