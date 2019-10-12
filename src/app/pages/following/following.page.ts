import { Component, OnInit } from '@angular/core';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss']
})
export class FollowingPage implements OnInit {
  followings = [];
  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService
  ) {}

  getAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getFollowing(auth.token, auth.id);
    });
  };

  getFollowing = (token, id) => {
    this.yoinkService.getFollowing(token, id).subscribe(following => {
      this.followings = following['following'];
    });
  };

  ngOnInit() {
    this.getAuth();
  }
}
