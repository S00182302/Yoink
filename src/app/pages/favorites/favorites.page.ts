import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { User } from 'src/app/models/user';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  posts: Post[] = [];
  user: User;
  auth: any;
  pageNumber: number = 1;
  userSavedPosts: Boolean = false;
  // auth: any;
  userLoaded: Boolean = false;
  postLoaded: Boolean = false;
  numberOfPages: number;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getUser = async () => {
    try {
      this.yoinkService
        .getSingleUser(this.auth.id, this.auth.token)
        .subscribe(user => {
          this.userLoaded = true;
          this.user = user;

          // ? CHECK IF THE USER HAS ANY SAVED POSTS
          if (this.user.savedPosts.length > 0) this.userSavedPosts = true;

          console.log('USER LOADED IN FAVOURITES PAGE:', this.user);
          this.posts = this.user.savedPosts;
        });
    } catch (error) {
      console.log(error);
    }
  };

  async ionViewWillEnter() {
    this.auth = await this.localStorageService.getAuth();
    this.getUser();
  }

  async ngOnInit() {}
}
