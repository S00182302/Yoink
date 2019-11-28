import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-follow-profile',
  templateUrl: './follow-profile.page.html',
  styleUrls: ['./follow-profile.page.scss']
})
export class FollowProfilePage implements OnInit {
  user_id: String;
  posts: Post[];
  user: any;
  auth: any;
  authUser: any;
  userLoaded: boolean = false;
  authUserIsFollowing: boolean = true;
  @Input() following: any;

  constructor(
    private route: ActivatedRoute,
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getSingleUser = async (id, token) => {
    await this.yoinkService.getSingleUser(id, token).subscribe(user => {
      this.userLoaded = true;
      this.user = user;
      this.posts = user.posts;
    });
  };

  getAuthUser = async (id, token) => {
    await this.yoinkService.getSingleUser(id, token).subscribe(user => {
      this.authUser = user;
      const authUsersFollowings = this.authUser.following;

      authUsersFollowings.forEach(user => {
        // this.authUserIsFollowing = user._id == this.user_id ? true : false;

        if (user._id == this.user_id) this.authUserIsFollowing = true;
      });
    });
  };

  unfollowUser = () => {
    this.yoinkService
      .unfollowUser(this.auth.token, this.auth.id, this.user_id)
      .subscribe(
        res => {
          console.log(res['message']);
        },
        error => {
          console.log(error.error);
        }
      );
    this.authUserIsFollowing = false;
    this.user.followers.length--;
  };

  followUser = () => {
    this.yoinkService
      .followUser(this.auth.token, this.auth.id, this.user_id)
      .subscribe(
        res => {
          console.log(res['message']);
        },
        error => {
          console.log(error.error);
        }
      );
    this.authUserIsFollowing = true;
    this.user.followers.length++;
  };

  async ionViewWillEnter() {
    this.auth = await this.localStorageService.getAuth();

    this.user_id = this.route.snapshot.paramMap.get('id');

    this.getSingleUser(this.user_id, this.auth.token);

    this.getAuthUser(this.auth.id, this.auth.token);
  }

  ngOnInit() {}
}
