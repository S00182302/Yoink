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
    await this.localStorageService
      .getAuth()
      .then(async auth => {
        await this.yoinkService.getSingleUser(auth.id, auth.token).subscribe(
          user => {
            console.log(user);
            this.user = user;
            this.userLoaded = true;
          },
          error => {
            console.log(error);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  ionViewWillEnter() {
    this.getUser();
  }

  ionViewWillLeave() {
    console.log('view left');
  }

  ngOnInit() {}
}
