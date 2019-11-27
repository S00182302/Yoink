import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: any;
  auth: any;
  userLoaded: Boolean = false;
  posts: Post[] = [];
  pageNumber: number = 1;
  postLoaded: Boolean = false;
  numberOfPages: number;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getSingleUser = (id, token) => {
    this.yoinkService.getSingleUser(id, token).subscribe(async user => {
      this.userLoaded = true;
      this.user = user;
      this.posts = user.posts;
    });
  };

  async ngOnInit() {
    this.auth = await this.localStorageService.getAuth();
    this.getSingleUser(this.auth.id, this.auth.token);
  }
}
