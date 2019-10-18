import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  ngOnInit() {}

  email: string = '';
  password: string = '';
  allowNavigation: Boolean = false;
  vaild: Boolean = true;
  invalid: Boolean = false;

  constructor(
    private yoinkService: YoinkService,
    public alertController: AlertController,
    private router: Router
  ) {}

  registerUser = async () => {
    // Check for empty fields
    if (!this.email || !this.password) {
      this.allowNavigation = false;
      this.invalid = true;
      return this.sendAlert('Please enter all fields');
    }

    // Register the user
    this.yoinkService.register(this.email, this.password).subscribe(
      res => {
        console.log(res);
        this.allowNavigation = true;
        this.router.navigateByUrl('/login');
      },
      err => {
        return this.sendAlert(err.message);
      }
    );

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
