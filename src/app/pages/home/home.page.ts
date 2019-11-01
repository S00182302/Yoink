import { Component, ViewChild, Input } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @Input() user: User;
  posts: Post[] = [];
  subscription: any;
  auth: any;
  pageNumber: number = 1;
  numberOfPages: number;
  selectedIndex: any;
  touchTime: number = 0;
  postLikedAnim: Boolean;
  postLoaded: Boolean = false;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  constructor(
    private yoinkService: YoinkService,
    private localStorage: StoredataService
  ) {}

  doRefresh = event => {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      // this.getAllPost()
      console.log('Post Length: ', this.posts.length);
      event.target.complete();
    }, 2000);
  };

  loadData = event => {
    this.pageNumber++;
    setTimeout(async () => {
      await this.localStorage.getAuth().then(auth => {
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

  getUserAuth = async () => {
    await this.localStorage.getAuth();
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

  favouritePost = async (post, index) => {
    await this.localStorage
      .getAuth()
      .then(async auth => {
        await this.yoinkService
          .favouritePost(auth.id, post._id, auth.token)
          .subscribe(
            res => console.log(res),
            error => console.log(error.error.message)
          );
      })
      .catch(error => {
        console.log(error);
      });

    this.selectedIndex = index;
  };

  ngOnInit() {
    this.localStorage.getAuth().then(auth => {
      this.getAllPost(auth['token'], 1, 10);
    });
    if (this.user != null) this.posts = this.user.savedPosts;
  }
}
