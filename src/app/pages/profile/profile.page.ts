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
  // slug = '';
  user: any;
  auth: any;
  userLoaded: Boolean = false;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService,
    private route: ActivatedRoute
  ) {}

  getSingleUser = async () => {
    try {
      this.yoinkService
        .getSingleUser(this.auth.id, this.auth.token)
        .subscribe(user => {
          this.user = user;
          this.userLoaded = true;
          console.log('USER LOADED IN PROFILE PAGE:', this.user);
        });
    } catch (error) {
      console.log(error);
    }
  };

  async ngOnInit() {
    try {
      this.auth = await this.localStorageService.getAuth();
      this.getSingleUser();
    } catch (error) {
      console.log(error);
    }
  }
}
