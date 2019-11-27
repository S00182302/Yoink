import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceLocation } from 'src/app/models/location.model';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';

// function base64toBlob(base64Data, contentType) {
//   contentType = contentType || '';
//   const sliceSize = 1024;
//   const byteCharacters = window.atob(base64Data);
//   const bytesLength = byteCharacters.length;
//   const slicesCount = Math.ceil(bytesLength / sliceSize);
//   const byteArrays = new Array(slicesCount);

//   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     const begin = sliceIndex * sliceSize;
//     const end = Math.min(begin + sliceSize, bytesLength);

//     const bytes = new Array(end - begin);
//     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   return new Blob(byteArrays, { type: contentType });
// }

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss']
})
export class CreatePostPage implements OnInit {
  form: FormGroup;
  @ViewChild('camera', { static: false }) child: any;
  displayImage: any;

  constructor(
    private localStorage: StoredataService,
    private yoinkService: YoinkService,
    private camera: Camera
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
      };

      console.log(newPost);

      this.yoinkService.createPost(auth.token, newPost, imagePath).then(res => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  ionViewWillLeave() {}

  ionViewWillEnter() {
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
