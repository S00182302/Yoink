import { Component, OnInit, Input } from '@angular/core';
import { StoredataService } from 'src/app/services/storedata.service';
import { Post } from 'src/app/models/post';
import { YoinkService } from 'src/app/services/yoink.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  postIsFavourited: boolean = false;
  icon: string = 'star-outline';
  auth: any;
  color: string;
  @Input() post: Post;

  constructor(
    private localStorage: StoredataService,
    private yoinkService: YoinkService
  ) {}

  checkIfUserHasPostFavourited = (userId, token) => {
    this.yoinkService.getSingleUser(userId, token).subscribe(user => {
      user.savedPosts.forEach(post => {
        if (post['_id'] == this.post._id) {
          this.postIsFavourited = true;
          this.icon = 'star';
          this.color = 'red';
        }
      });
    });
  };

  favouritePost = async () => {
    if (!this.postIsFavourited) {
      await this.yoinkService
        .favouritePost(this.auth.id, this.post._id, this.auth.token)
        .subscribe(
          res => {
            console.log(res['message']);
          },
          error => {
            console.log(error.error.message);
          }
        );
      this.postIsFavourited = true;
      this.icon = 'star';
    } else {
      this.unFavouritePost();
    }
  };

  unFavouritePost = async () => {
    this.postIsFavourited = false;
    this.icon = 'star-outline';

    await this.yoinkService
      .unFavouritePost(this.auth.id, this.post._id, this.auth.token)
      .subscribe(
        res => {
          console.log(res['message']);
        },
        error => {
          console.log(error.error.message);
        }
      );
  };

  async ngOnInit() {
    this.auth = await this.localStorage.getAuth();

    this.checkIfUserHasPostFavourited(this.auth.id, this.auth.token);
  }
}
