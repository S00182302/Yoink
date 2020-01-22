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
  auth: any;
  constructor(
    private yoinkService: YoinkService,
    private localStorage: StoredataService
  ) {}

  getFollowers = (token, id) => {
    this.yoinkService.getFollowers(token, id).subscribe(followers => {
      this.followers = followers['followers'];
      console.log(this.followers);
    });
  };

  ionViewDidEnter = async () => {
    this.auth = await this.localStorage.getAuth();

    this.getFollowers(this.auth.token, this.auth.id);
  };

  async ngOnInit() {}
}
