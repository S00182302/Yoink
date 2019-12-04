import { Component, ViewChild } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { ThemeService } from 'src/app/services/theme.service';

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
  newNumberOfPages: number;
  numberOfPosts: number;
  newNumberOfPosts: number;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  constructor(
    private modal: ModalController,
    private yoinkService: YoinkService,
    private localStorage: StoredataService,
    private theme: ThemeService
  ) {}

  enableDarkmode() {
    this.theme.enableDarkmode();
  }

  enableLightmode() {
    this.theme.enableLightmode();
  }

  fetchNewPosts = event => {
    setTimeout(async () => {
      await this.yoinkService
        .getFeed(this.auth.token, 1, 10)
        .subscribe(posts => {
          const postsArray = posts['posts']['docs'];
          this.newNumberOfPosts = posts['posts']['total'];

          console.log(posts);
          console.log(this.numberOfPosts);
          console.log(this.newNumberOfPosts);

          if (this.numberOfPosts != this.newNumberOfPosts) {
            console.log('object');
            postsArray.forEach(post => {
              if (!this.posts.includes(post)) {
                // this.posts.unshift(post);
                console.log('post that is new -->', post);
              }
            });
          }

          // console.log('POSTS IN HOME PAGE:', this.posts);
        });
      event.target.complete();
    }, 2000);
  };

  presentFilter = async () => {
    const Filter = this.modal.create({
      component: FilterComponent
    });
    (await Filter).present();
  };

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
      this.numberOfPosts = posts['posts']['total'];

      postsArray.forEach(post => {
        this.posts.push(post);
      });

      console.log('POSTS IN HOME PAGE:', this.posts);
    });
  };

  async ngOnInit() {
    this.auth = await this.localStorage.getAuth();

    this.getAllPost(this.auth.token, 1, 10);

    this.enableDarkmode();
  }
}
