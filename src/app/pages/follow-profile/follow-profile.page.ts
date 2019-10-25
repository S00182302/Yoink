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

  @Input() following: any;

  constructor(
    private route: ActivatedRoute,
    private yoinkService: YoinkService,
    private storageService: StoredataService
  ) {}

  getUserAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getFollowerProfile(this.user_id, auth.token);
    });
  };
  getFollowerProfile = (id, token) => {
    this.yoinkService.getSingleUser(id, token).subscribe(user => {
      console.log(user);
      this.user = user;
    });
  };

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('id');
    this.getUserAuth();
  }
}
