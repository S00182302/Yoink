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
  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService,
    private route: ActivatedRoute
  ) {}

  getAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getFollowing(auth.token, this.slug);
    });
  };

  getFollowing = (token, id) => {
    this.yoinkService.getFollowing(token, id).subscribe(following => {
      this.followings = following['following'];
    });
  };

  ngOnInit() {
    this.getAuth();
    this.slug = this.route.snapshot.paramMap.get('id');
    console.log(this.slug);
  }
}
