import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss']
})
export class FollowersPage implements OnInit {
  followers: [];
  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService
  ) {}

  getAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getFollowers(auth.token, auth.id);
    });
  };

  getFollowers = (token, id) => {
    this.yoinkService.getFollowers(token, id).subscribe(followers => {
      this.followers = followers['followers'];
    });
  };

  ngOnInit() {
    this.getAuth();
  }
}
