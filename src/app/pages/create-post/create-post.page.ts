import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
// import { PlacesService } from '../../places.service';

import { switchMap } from 'rxjs/operators';
import { PlaceLocation } from 'src/app/models/location.model';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss']
})
export class CreatePostPage implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private localStorage: StoredataService,
    private yoinkService: YoinkService
  ) {}

  createPost = async () => {
    await this.localStorage.getAuth().then(auth => {
      const newPost = {
        title: this.form.get('title').value,
        description: this.form.get('description').value,
        price: this.form.get('price').value,
        discountedPrice: this.form.get('discountedPrice').value,
        location: this.form.get('location').value,
        locality: this.form.get('locality').value,
        storeName: this.form.get('storeName').value,
        image: this.form.get('image').value,
        user_id: auth.id
      };

      console.log(newPost);
      // this.yoinkService.createPost(auth.token, newPost).subscribe(
      //   res => {
      //     console.log(res);
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    });
  };

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
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
      location: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null)
    });
  }

  // onCreateOffer() {
  //   if (!this.form.valid || !this.form.get('image').value) {
  //     return;
  //   }
  //   this.loadingCtrl
  //     .create({
  //       message: 'Adding deal..'
  //     })
  //     .then(loadingEl => {
  //       loadingEl.present();
  //       this.placesService
  //         .uploadImage(this.form.get('image').value)
  //         .pipe(
  //           switchMap(uploadRes => {
  //             return this.placesService.addPlace(
  //               this.form.value.title,
  //               this.form.value.description,
  //               +this.form.value.price,
  //               new Date(this.form.value.dateFrom),
  //               new Date(this.form.value.dateTo),
  //               this.form.value.location,
  //               uploadRes.imageUrl
  //             );
  //           })
  //         )
  //         .subscribe(() => {
  //           loadingEl.dismiss();
  //           this.form.reset();
  //           this.router.navigate(['/places/tabs/offers']);
  //         });
  //     });
  // }
}
