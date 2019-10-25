import { Component, ViewChild } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Platform, IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  FilterSection = false;
  searchbar = false;
  posts: string[] = [];
  subscription: any;
  auth: any;
  pageNumber: number = 2;
  numberOfPages: number;
  selectedIndex: any;
  counties: string[] = [
    'Antrim,',
    'Armagh',
    'Carlow',
    'Cavan',
    'Clare',
    'Cork',
    'Derry',
    'Donegal',
    'Down',
    'Dublin',
    'Fermanagh',
    'Galway',
    'Kerry',
    'Kildare',
    'Kilkenny',
    'Laois',
    'Leitrim',
    'Limerick',
    'Longford',
    'Louth',
    'Mayo',
    'Meath',
    'Monaghan',
    'Offaly',
    'Roscommon',
    'Sligo',
    'Tipperary',
    'Tyrone',
    'Waterford',
    'Westmeath',
    'Wexford',
    'Wicklow'
  ];

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  constructor(
    public popoverController: PopoverController,
    private yoinkService: YoinkService,
    private localStorage: StoredataService,
    private platform: Platform
  ) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      cssClass: 'custom-popover',
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  showSearch() {
    this.searchbar = true;
  }
  hideFilterSection() {
    this.FilterSection = false;
  }
  hideSearch() {
    this.searchbar = false;
  }

  applyFilters() {}

  showFilterSection() {
    console.log('Working');
    this.FilterSection = true;
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

  ngOnInit() {
    this.localStorage.getAuth().then(auth => {
      this.getAllPost(auth['token'], 1, 2);
    });
  }
}
