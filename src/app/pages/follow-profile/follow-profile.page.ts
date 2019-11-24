import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-follow-profile',
  templateUrl: './follow-profile.page.html',
  styleUrls: ['./follow-profile.page.scss']
})
export class FollowProfilePage implements OnInit {
  user_id: String;
  user: any;
  auth: any;
  @Input() following: any;

  constructor(
    private route: ActivatedRoute,
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getFollowerProfile = () => {
    this.yoinkService
      .getSingleUser(this.user_id, this.auth.token)
      .subscribe(user => {
        this.user = user;
        console.log('USER IN FOLLOW-PROFILE PAGE:', this.user);
      });
  };

  async ngOnInit() {
    this.user = null;
    console.log('called ngOnInit');
    try {
      this.user_id = this.route.snapshot.paramMap.get('id');
      this.auth = await this.localStorageService.getAuth();
      this.getFollowerProfile();
    } catch (error) {
      console.log(error);
    }
  }
}
