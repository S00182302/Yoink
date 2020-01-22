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
  email: string = '';
  password: string = '';
  allowNavigation: Boolean = false;
  vaild: Boolean = true;
  invalid: Boolean = false;
  data: any;
  userLoaded: Boolean = true;

  constructor(
    private yoinkService: YoinkService,
    public alertController: AlertController,
    private router: Router,
    private localStorage: StoredataService
  ) {}

  loginUser = async () => {
    this.userLoaded = false;
    if (!this.email || !this.password) {
      this.allowNavigation = false;

      this.invalid = true;

      return this.sendAlert('Please enter all fields');
    }

    await this.yoinkService.login(this.email, this.password).subscribe(
      async res => {
        this.allowNavigation = true;

        await this.localStorage.setAuth(res['_id'], res['token']).then(
          auth =>
            console.log(
              `Auth stored to local storage! ID: ${auth.id}, Token: ${auth.token}`
            ),
          error => console.error('Error storing auth', error)
        );

        this.router.navigate(['tabs/home']);
        this.userLoaded = true;
      },
      err => {
        return this.sendAlert(err.error.message);
      }
    );

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

  ngOnInit() {}
}
