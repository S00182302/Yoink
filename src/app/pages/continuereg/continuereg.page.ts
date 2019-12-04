import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-continuereg',
  templateUrl: './continuereg.page.html',
  styleUrls: ['./continuereg.page.scss']
})
export class ContinueregPage implements OnInit {
  location: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  locations = [
    {
      id: 2,
      location: 'Antrim'
    },
    {
      id: 3,
      location: 'Armagh'
    },
    {
      id: 4,
      location: 'Carlow'
    },
    {
      id: 5,
      location: 'Cavan'
    },
    {
      id: 6,
      location: 'Clare'
    },
    {
      id: 7,
      location: 'Cork'
    },
    {
      id: 8,
      location: 'Derry'
    },
    {
      id: 9,
      location: 'Donegal'
    },
    {
      id: 10,
      location: 'Down'
    },
    {
      id: 11,
      location: 'Dublin'
    },
    {
      id: 12,
      location: 'Fermanagh'
    },
    {
      id: 13,
      location: 'Galway'
    },
    {
      id: 14,
      location: 'Kerry'
    },
    {
      id: 15,
      location: 'Kildare'
    },
    {
      id: 16,
      location: 'Kilkenny'
    },
    {
      id: 17,
      location: 'Laois'
    },
    {
      id: 18,
      location: 'Leitrim'
    },
    {
      id: 19,
      location: 'Limerick'
    },
    {
      id: 20,
      location: 'Longford'
    },
    {
      id: 21,
      location: 'Louth'
    },
    {
      id: 22,
      location: 'Mayo'
    },
    {
      id: 23,
      location: 'Meath'
    },
    {
      id: 24,
      location: 'Monaghan'
    },
    {
      id: 25,
      location: 'Offaly'
    },
    {
      id: 26,
      location: 'Roscommon'
    },
    {
      id: 27,
      location: 'Sligo'
    },
    {
      id: 28,
      location: 'Tipperary'
    },
    {
      id: 29,
      location: 'Tyrone'
    },
    {
      id: 30,
      location: 'Westmeath'
    },
    {
      id: 31,
      location: 'Wexford'
    },
    {
      id: 32,
      location: 'Wicklow'
    }
  ];

  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private yoinkService: YoinkService,
    private alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user);
      }
    });
  }

  // ? Register the user
  registerUser = () => {
    if (!this.firstName || !this.lastName || !this.location) {
      return this.sendAlert('Please enter all fields');
    }

    let newUser = {
      email: this.user.email,
      password: this.user.password,
      location: this.location['location'],
      firstName: this.firstName,
      lastName: this.lastName
    };

    console.log(newUser);

    this.yoinkService.register(newUser).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/login');
      },
      err => {
        return this.sendAlert(err.error.message);
      }
    );
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

  handleLocation = e => {
    console.log(e.value);
  };

  ngOnInit() {}
}
