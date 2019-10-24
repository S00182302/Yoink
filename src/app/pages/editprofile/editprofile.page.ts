import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss']
})
export class EditprofilePage implements OnInit {
  @Input() id: string;
  token: string;
  user: any;
  email: string = '';
  gender: string = 'male';

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private navParams: NavParams,
    private yoinkService: YoinkService,
    private storageService: StoredataService,
    public toastController: ToastController
  ) {
    console.log(navParams.get('id'));
  }
  getAuth = async () => {
    await this.storageService.getAuth().then(auth => {
      this.token = auth.token;
    });
  };

  getUser = async () => {
    await this.yoinkService
      .getSingleUser(this.id, this.token)
      .subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
  };

  genderChanged = (ev: any) => {
    console.log('Gender changed:', ev.detail.value);
  };

  dismiss = () => {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  };

  editProfile = () => {
    this.presentToast();
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Profile Updated',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }

  // async presentToastWithOptions() {
  //   const toast = await this.toastController.create({
  //     header: 'Toast header',
  //     message: 'Click to Close',
  //     position: 'top',
  //     buttons: [
  //       {
  //         side: 'start',
  //         icon: 'star',
  //         text: 'Favorite',
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       },
  //       {
  //         text: 'Done',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   toast.present();
  // }

  ngOnInit() {
    this.getAuth();
    this.getUser();
  }
}
