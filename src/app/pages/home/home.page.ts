import { Component, ViewChild } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { IonInfiniteScroll } from '@ionic/angular';

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
  selectedIndex: any;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  constructor(
    private yoinkService: YoinkService,
    private localStorage: StoredataService
  ) {}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      this.localStorage.getAuth().then(auth => {
        this.getAllPost(auth['token'], this.pageNumber, 10);
      });
      this.pageNumber++;
      console.log('page', this.pageNumber);

      event.target.complete();

      if (this.pageNumber == this.numberOfPages) {
        event.target.disabled = true;
      }
    }, 500);
  }

  getUserAuth = async () => {
    await this.localStorage.getAuth();
  };

  getAllPost = (token, page, perPage) => {
    this.yoinkService.getFeed(token, page, perPage).subscribe(posts => {
      console.log(posts);
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
  }
}
