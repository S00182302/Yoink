import { Component, OnInit } from '@angular/core';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss']
})
export class FollowingPage implements OnInit {
  followings = [];
  slug: string;
  auth: any;
  constructor(
    private yoinkService: YoinkService,
    private localStorage: StoredataService,
    private route: ActivatedRoute
  ) {}

  getFollowing = (token, id) => {
    console.log('sadsad', id);
    this.yoinkService.getFollowing(token, id).subscribe(following => {
      this.followings = following['following'];
      console.log(this.followings);
    });
  };

  ionViewWillEnter = async () => {
    this.auth = await this.localStorage.getAuth();
    this.slug = this.route.snapshot.paramMap.get('id');
    this.getFollowing(this.auth.token, this.slug);
  };

  ngOnInit() {}
}
