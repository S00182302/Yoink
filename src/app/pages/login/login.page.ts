import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StoredataService } from 'src/app/services/storedata.service';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  data: any;
  loading: Boolean = false;
  loginForm: FormGroup;
  loginErrors: string;

  constructor(
    private _yoinkService: YoinkService,
    public _alertController: AlertController,
    private _router: Router,
    private _localStorage: StoredataService,
    private _formBuilder: FormBuilder
  ) {}

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  async loginUser() {
    this.loading = true;

    await this._yoinkService
      .login(this.email.value, this.password.value)
      .subscribe(
        res => {
          this._localStorage.setAuth(res['_id'], res['token']).then(
            auth =>
              console.log(
                `Auth stored to local storage! ID: ${auth.id}, Token: ${auth.token}`
              ),
            error => console.error('Error storing auth', error)
          );

          this._router.navigate(['tabs/home']);
          this.loading = false;
        },
        err => {
          return this.sendAlert(err.error.message);
        }
      );
  }

  async sendAlert(message: string) {
    const alert = await this._alertController.create({
      header: 'Uh oh!',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
    this.loginForm.valueChanges.subscribe(console.log);
  }
}
