import { Component, OnInit, Input } from '@angular/core';
import {
  ModalController,
  NavParams,
  ActionSheetController,
  Platform
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

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
  form: FormGroup;
  image: string = '';
  images = [];

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private navParams: NavParams,
    private yoinkService: YoinkService,
    private storageService: StoredataService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private localStorage: StoredataService,
    private file: File,
    private webView: WebView,
    private plt: Platform
  ) {
    console.log(navParams.get('id'));
  }

  loadStoredImages() {
    this.localStorage.getImages().then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webView.convertFileSrc(img);
      return converted;
    }
  }

  recieveImagePath = e => {
    console.log('Image Path in edit profile page:', e);
    this.image = e;
  };

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
    this.modalController.dismiss({
      dismissed: true
    });
  };

  editProfile = () => {
    this.presentToast();
    this.setUserDetailsToInput();
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Profile Updated',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }

  setUserDetailsToInput = () => {
    const details = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      gender: this.form.get('gender').value
    };

    console.log('DETAILS', details);
  };

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
    this.getAuth();
    this.getUser();
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      firstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      userName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      gender: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
    // this.setUserDetailsToInput();
  }
}
