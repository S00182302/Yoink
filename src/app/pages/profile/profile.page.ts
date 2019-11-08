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
  userLoaded: Boolean = false;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService,
    private route: ActivatedRoute
  ) {}

  // getUserAuth = () => {
  //   this.storageService.getAuth().then(auth => {
  //     this.getSingleUser(auth.id, auth.token);
  //     this.userLoaded = true;
  //   });
  // };

  getSingleUser = async () => {
    try {
      const auth = await this.localStorageService.getAuth();

      this.yoinkService.getSingleUser(auth.id, auth.token).subscribe(user => {
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
      const auth = await this.localStorageService.getAuth();

      // this.getUserAuth();
      this.getSingleUser();
      // this.slug = this.route.snapshot.paramMap.get('id');
    } catch (error) {
      console.log(error);
    }
  }
}
