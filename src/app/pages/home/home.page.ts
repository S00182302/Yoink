import { Component } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  posts: [];
  subscription: any;
  constructor(
    private yoinkService: YoinkService,
    private localStorage: StoredataService,
    private platform: Platform
  ) {}
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  getUserAuth = () => {
    this.localStorage.getAuth().then(auth => this.getAllPost(auth.token));
  };

  getAllPost = token => {
    this.yoinkService.getFeed(token).subscribe(posts => {
      this.posts = posts['posts'];
      console.log(this.posts);
    });
  };

  ngOnInit() {
    this.getUserAuth();
  }
}
