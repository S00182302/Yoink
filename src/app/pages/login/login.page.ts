import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  ngOnInit() {}

  name: string = '';
  email: string = '';
  password: string = '';
  allowNavigation: Boolean = false;
  vaild: Boolean = true;
  invalid: Boolean = false;
  data: any;
  token: String = '';
  userId: String = '';

  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService,
    public alertController: AlertController,
    private router: Router
  ) {}

  // setToken = token => {
  //   this.storageService.setToken(token);
  // };

  setUserAuth = (id, token) => {
    this.storageService.setToken(id, token);
  };

  setUserId = id => {
    this.storageService.setUserID(id);
  };

  loginUser = async () => {
    // Check for empty fields
    if (!this.email || !this.password || !this.name) {
      this.allowNavigation = false;
      this.invalid = true;
      return this.sendAlert('Please enter all fields');
    }

    // User login
    this.yoinkService.login(this.email, this.password).subscribe(
      res => {
        this.allowNavigation = true;
        this.router.navigate(['tabs/home']);
        this.token = res['token'];
        this.userId = res['_id'];
        this.setUserAuth(this.userId, this.token);
        this.setUserId(this.userId);
      },
      err => {
        return this.sendAlert(err.error.message);
      }
    );
    // Reset the fields
    this.email = '';
    this.password = '';
    this.name = '';
    this.invalid = false;
  };

  sendAlert = async (message: string) => {
    const alert = await this.alertController.create({
      header: 'Uh oh!',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  };
}
