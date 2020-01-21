import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceLocation } from 'src/app/models/location.model';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { LocationHandlerComponent } from 'src/app/components/location-handler/location-handler.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss']
})
export class CreatePostPage implements OnInit {
  @ViewChild('camera', { static: false }) child: any;
  form: FormGroup;
  displayImage: any;
  locationData: any;

  constructor(
    private localStorage: StoredataService,
    private yoinkService: YoinkService,
    private camera: Camera,
    private modal: ModalController
  ) {}

  recieveProduct = e => {
    console.log('Product recieved from barcodescanner:', e);
  };

  createPost = async () => {
    try {
      const imagePath = await this.localStorage.getImagePath();

      const auth = await this.localStorage.getAuth();

      const newPost = {
        title: this.form.get('title').value,
        description: this.form.get('description').value,
        price: this.form.get('price').value,
        discountedPrice: this.form.get('discountedPrice').value,
        category: this.form.get('category').value,
        locality: this.form.get('locality').value,
        storeName: this.form.get('storeName').value,
        user_id: auth.id
        // locality: this.locationData.location
      };

      this.yoinkService.createPost(auth.token, newPost, imagePath).then(res => {
        let id = res['_id'];
        console.log(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // presentFilter = async () => {
  //   const Filter = await this.modal.create({
  //     component: LocationHandlerComponent,
  //     componentProps: { location }
  //   });

  //   Filter.onDidDismiss().then(data => {
  //     this.locationData = data;
  //     console.log(this.locationData.location);
  //   });

  //   (await Filter).present();
  // };

  async ionViewWillEnter() {
    this.child.takePicture(this.camera.PictureSourceType.CAMERA);
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      storeName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      locality: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      discountedPrice: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }
}
