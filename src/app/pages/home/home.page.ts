import { Component, ViewChild } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { FilterComponent } from 'src/app/components/filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  isShow = true;

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
    private modal: ModalController,
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
  async presentFilter() {
    const Filter = this.modal.create({
      component: FilterComponent
    });
    (await Filter).present();
  }

  toggleSearch() {
    this.isShow = !this.isShow;
  }

  loadData = event => {
    this.pageNumber++;
    setTimeout(async () => {
      await this.getAllPost(this.auth['token'], this.pageNumber, 10);

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
      this.postLoaded = true;

      const postsArray = posts['posts']['docs'];

      this.numberOfPages = posts['posts']['pages'];

      postsArray.forEach(post => {
        this.posts.push(post);
      });

      console.log('POSTS IN HOME PAGE:', this.posts);
    });
  };

  favouritePost = async (post, index) => {
    await this.yoinkService
      .favouritePost(this.auth.id, post._id, this.auth.token)
      .subscribe(
        res => console.log(res),
        error => console.log(error.error.message)
      );

    this.selectedIndex = index;
  };

  async ngOnInit() {
    this.auth = await this.localStorage.getAuth();

    this.getAllPost(this.auth.token, 1, 10);
  }
}
