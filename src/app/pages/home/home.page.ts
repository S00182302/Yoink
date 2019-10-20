import { Component, ViewChild } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Platform, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  posts: string[] = [];
  subscription: any;
  auth: any;
  pageNumber: number = 2;
  numberOfPages: number;
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  constructor(
    private yoinkService: YoinkService,
    private localStorage: StoredataService,
    private platform: Platform
  ) {}

  loadData(event) {
    setTimeout(() => {
      this.localStorage.getAuth().then(auth => {
        this.getAllPost(auth['token'], this.pageNumber, 2);
      });
      this.pageNumber++;
      console.log('page', this.pageNumber);

      event.target.complete();

      if (this.pageNumber == this.numberOfPages) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  getUserAuth = async () => {
    await this.localStorage.getAuth();
  };

  getAllPost = (token, page, perPage) => {
    // console.log(token, page, perPage);
    this.yoinkService.getFeed(token, page, perPage).subscribe(posts => {
      const array = posts['docs'];
      this.numberOfPages = posts['pages'];
      array.forEach(post => {
        this.posts.push(post);
      });
    });
  };

  ngOnInit() {
    this.localStorage.getAuth().then(auth => {
      this.getAllPost(auth['token'], 1, 2);
    });
  }
}
