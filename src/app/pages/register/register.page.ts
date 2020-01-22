import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  ngOnInit() {}

  email: string = '';
  password: string = '';
  // allowNavigation: Boolean = false;
  vaild: Boolean = true;
  invalid: Boolean = false;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private yoinkService: YoinkService
  ) {}

  registerUser = async () => {
    if (!this.email || !this.password) {
      // this.allowNavigation = false;
      this.invalid = true;
      return this.sendAlert('Please enter all fields');
    }

    const user = {
      email: this.email,
      password: this.password
    };

    let navigationExtras: NavigationExtras = {
      state: {
        user
      }
    };
    this.router.navigate(['/continuereg'], navigationExtras);

    // Reset the fields
    this.email = '';
    this.password = '';
    this.invalid = false;
  };

  async presentAlert() {}
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
