import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-follow-profile',
  templateUrl: './follow-profile.page.html',
  styleUrls: ['./follow-profile.page.scss']
})
export class FollowProfilePage implements OnInit {
  user_id: String;
  posts: Post[];
  user: any;
  auth: any;
  userLoaded: boolean = false;
  @Input() following: any;

  constructor(
    private route: ActivatedRoute,
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getSingleUser = async (id, token) => {
    await this.yoinkService.getSingleUser(id, token).subscribe(user => {
      this.user = user;
      this.posts = user.posts;
    });
  };

  ionViewWillEnter() {
    this.user_id = this.route.snapshot.paramMap.get('id');
    console.log('id in follow-profile page -->', this.user_id);
  }

  async ngOnInit() {
    this.auth = await this.localStorageService.getAuth();

    this.getSingleUser(this.user_id, this.auth.token);
  }
}
