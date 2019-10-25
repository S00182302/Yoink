import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  slug = '';
  user: any;
  userLoaded: Boolean = false;
  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService,
    private route: ActivatedRoute
  ) {}

  getUserAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getSingleUser(auth.id, auth.token);
      this.userLoaded = true;
    });
  };

  getSingleUser = (id, token) => {
    this.yoinkService.getSingleUser(id, token).subscribe(user => {
      this.user = user;
    });
  };

  ngOnInit() {
    this.getUserAuth();
    this.slug = this.route.snapshot.paramMap.get('id');
  }
}
