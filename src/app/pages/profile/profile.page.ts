import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: any;
  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService
  ) {}

  getUserAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getSingleUser(auth.id, auth.token);
    });
  };

  getSingleUser = (id, token) => {
    this.yoinkService.getSingleUser(id, token).subscribe(user => {
      console.log(user);
      this.user = user;
    });
  };

  ngOnInit() {
    this.getUserAuth();
  }
}
