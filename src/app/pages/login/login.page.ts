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

  email: string = '';
  password: string = '';
  allowNavigation: Boolean = false;
  vaild: Boolean = true;
  invalid: Boolean = false;
  data: any;
  token: String = '';
  userId: String = '';
  loading: Boolean;

  constructor(
    private yoinkService: YoinkService,
    public alertController: AlertController,
    private router: Router,
    private localStorage: StoredataService
  ) {
    this.loading = false;
  }

  loginUser = async () => {
    // Check for empty fields
    if (!this.email || !this.password) {
      this.allowNavigation = false;
      this.invalid = true;
      return this.sendAlert('Please enter all fields');
    }

    // User login
    this.yoinkService.login(this.email, this.password).subscribe(
      async res => {
        this.allowNavigation = true;
        this.token = res['token'];
        this.userId = res['_id'];

        this.localStorage
          .setAuth(this.userId, this.token)
          .then(
            auth =>
              console.log(
                `Auth stored to local storage! ID: ${auth.id}, Token: ${auth.token}`
              ),
            error => console.error('Error storing auth', error)
          );

        this.router.navigate(['tabs/home']);
        this.loading = true;
      },
      err => {
        return this.sendAlert(err.error.message);
      }
    );

    // Reset the fields
    this.email = '';
    this.password = '';
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
