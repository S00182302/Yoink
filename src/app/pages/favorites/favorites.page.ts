import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/components/post/post';


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
  userLoaded: Boolean = false;
  postLoaded: Boolean = false;
  numberOfPages: number;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  loadData = event => {
    this.pageNumber++;
    setTimeout(async () => {
      await this.localStorageService.getAuth().then(auth => {
        this.getAllPost(auth['token'], this.pageNumber, 10);
      });
      console.log('page', this.pageNumber);

      event.target.complete();
      console.log('Posts length:', this.posts.length);

      if (this.pageNumber == this.numberOfPages) {
        event.target.disabled = true;
      }
    }, 500);
  };

  getAllPost = async (token, page, perPage) => {
    await this.yoinkService.getFeed(token, page, perPage).subscribe(posts => {
      console.log('Retrived posts in Home page:', posts);
      this.postLoaded = true;
      const array = posts['posts']['docs'];
      this.numberOfPages = posts['posts']['pages'];

      array.forEach(post => {
        this.posts.push(post);
      });
    });
  };

  getUser = async () => {
    try {
      const auth = await this.localStorageService.getAuth();

      this.yoinkService.getSingleUser(auth.id, auth.token).subscribe(user => {
        this.user = user;
        this.userLoaded = true;
        console.log('User loaded:', this.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  ionViewWillEnter() {
    this.getUser();
  }

  ionViewWillLeave() {
    console.log('view left');
  }

  ngOnInit() {
    if (this.user != null) this.posts = this.user.savedPosts;
  }
}
