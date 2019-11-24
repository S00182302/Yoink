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
  userSavedPosts: Boolean;
  // auth: any;
  userLoaded: Boolean = false;
  postLoaded: Boolean = false;
  numberOfPages: number;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  // loadData = event => {
  //   this.pageNumber++;
  //   setTimeout(async () => {
  //     await this.localStorageService.getAuth().then(auth => {
  //       this.getAllPost(auth['token'], this.pageNumber, 10);
  //     });
  //     console.log('page', this.pageNumber);

  //     event.target.complete();
  //     console.log('Posts length:', this.posts.length);

  //     if (this.pageNumber == this.numberOfPages) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  // };

  // getAllPost = async (token, page, perPage) => {
  //   await this.yoinkService.getFeed(token, page, perPage).subscribe(posts => {
  //     console.log('Retrived posts in Home page:', posts);
  //     this.postLoaded = true;
  //     const array = posts['posts']['docs'];
  //     this.numberOfPages = posts['posts']['pages'];

  //     array.forEach(post => {
  //       this.posts.push(post);
  //     });
  //   });
  // };

  getUser = async () => {
    try {
      this.yoinkService
        .getSingleUser(this.auth.id, this.auth.token)
        .subscribe(user => {
          this.userLoaded = true;
          this.user = user;
          if (this.user.savedPosts.length > 0) this.userSavedPosts = true;
          console.log('USER LOADED IN FAVOURITES PAGE:', this.user);
          this.posts = this.user.savedPosts;
        });
    } catch (error) {
      console.log(error);
    }
  };

  async ionViewWillEnter() {
    this.getUser();
    this.auth = await this.localStorageService.getAuth();
  }

  ionViewWillLeave() {
    console.log('view left');
  }

  async ngOnInit() {}
}
