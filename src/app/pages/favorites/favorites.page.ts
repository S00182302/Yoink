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
  userSavedPosts: Boolean;
  // auth: any;
  userLoaded: Boolean = false;

  constructor(
    private yoinkService: YoinkService,
    private localStorageService: StoredataService
  ) {}

  getUser = async () => {
    try {
      const auth = await this.localStorageService.getAuth();

      this.yoinkService.getSingleUser(auth.id, auth.token).subscribe(user => {
        this.userLoaded = true;
        this.user = user;
        if (this.user.savedPosts.length > 0) this.userSavedPosts = true;
        console.log('USER LOADED IN FAVOURITES PAGE:', this.user);
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
