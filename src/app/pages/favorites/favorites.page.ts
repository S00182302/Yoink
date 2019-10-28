import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  user: User;
  auth: any;
  userLoaded: Boolean = false;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getUser = async () => {
    try {
      const auth = await this.localStorageService.getAuth();

      this.yoinkService.getSingleUser(auth.id, auth.token).subscribe(user => {
        this.user = user;
        this.userLoaded = true;
        console.log('User loaded:', this.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  ionViewWillEnter() {
    this.getUser();
  }

  ionViewWillLeave() {
    console.log('view left');
  }

  ngOnInit() {}
}
