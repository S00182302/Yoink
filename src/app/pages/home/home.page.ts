import { Component } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  posts: [];
  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService
  ) {}

  getUserAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getAllPost(auth.token);
    });
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
