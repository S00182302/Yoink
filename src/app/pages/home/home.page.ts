import { Component, ViewChild } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Platform, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterComponent } from 'src/app/components/filter/filter.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  isShow = true;
  countieForm: FormGroup;
  FilterSection = false;
  searchbar = false;
  posts: string[] = [];
  subscription: any;
  auth: any;
  pageNumber = 2;
  numberOfPages: number;
  selectedIndex: any;
  categories: string[] = ['All', 'Home', 'Diy', 'Kids'];

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  constructor(
    private modal: ModalController,
    private fb: FormBuilder,
    private yoinkService: YoinkService,
    private localStorage: StoredataService,
    private platform: Platform
  ) {}

  async presentFilter() {
    const Filter = this.modal.create({
      component: FilterComponent
    });
    (await Filter).present();
  }

  toggleSearch() {
    this.isShow = !this.isShow;
  }

  loadData(event) {
    setTimeout(() => {
      this.localStorage.getAuth().then(auth => {
        this.getAllPost(auth['token'], this.pageNumber, 2);
      });
      this.pageNumber++;
      console.log('page', this.pageNumber);

      event.target.complete();

      if (this.pageNumber === this.numberOfPages) {
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
    this.yoinkService.getFeed(token, page, perPage).subscribe(posts => {
      const array = posts['docs'];
      this.numberOfPages = posts['pages'];
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
  getCategories() {}

  ngOnInit() {
    (this.countieForm = this.fb.group({
      countryControl: ['All Ireland']
    })),
      this.localStorage.getAuth().then(auth => {
        this.getAllPost(auth['token'], 1, 2);
      });
  }
}
