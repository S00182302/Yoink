import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
<<<<<<< HEAD
import { PostLocation } from 'src/app/models/location.model';
=======
import { PlaceLocation } from 'src/app/models/location.model';
import { StoredataService } from 'src/app/services/storedata.service';
import { YoinkService } from 'src/app/services/yoink.service';
>>>>>>> 7447fbb5043fec184343d4e0f55f88bfd98d297a

// .base64String instead of .base64Data For Capacitor v1
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
  category: string;

  constructor(
<<<<<<< HEAD
    // private postsService: PostsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) { }

=======
    private router: Router,
    private loadingCtrl: LoadingController,
    private localStorage: StoredataService,
    private yoinkService: YoinkService
  ) {}
>>>>>>> 7447fbb5043fec184343d4e0f55f88bfd98d297a

  recieveProduct = e => {
    console.log('Product recieved from barcodescanner:', e);
  };

  createPost = async () => {
    await this.localStorage
      .getImagePath()
      .then(async image => {
        console.log('image from local storage:', image);
        await this.localStorage
          .getAuth()
          .then(auth => {
            const newPost = {
              title: this.form.get('title').value,
              description: this.form.get('description').value,
              price: this.form.get('price').value,
              discountedPrice: this.form.get('discountedPrice').value,
              category: this.form.get('category').value,
              // location: this.form.get('location').value,
              locality: this.form.get('locality').value,
              storeName: this.form.get('storeName').value,
              user_id: auth.id
            };

            console.log(newPost);
            this.yoinkService
              .createPost(auth.token, newPost, image)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
            // this.yoinkService
            //   .createPost(auth.token, newPost, image)
            //   .subscribe(res => console.log(res));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
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
      storeName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(60)]
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
<<<<<<< HEAD
  // function to create drop down list, still need some work
  onPickCategory() {
    this.actionSheetCtrl
      .create({
        header: 'Please Choose',
        buttons: [
          {
            text: 'Food',
            handler: () => {
              this.category = 'Food';
            }
          },
          {
            text: 'Electronic Equipment',
            handler: () => {
              this.category = 'electronic equipment';
            }
          },
          {
            text: 'Sport and hobbies',
            handler: () => {
              this.category = 'Sport and hobbies';
            }
          },
          {
            text: 'House and DIY',
            handler: () => {
              this.category = 'House and DIY';
            }
          },
          {
            text: 'Farming',
            handler: () => {
              this.category = 'Farming';
            }
          },
          {
            text: 'Music and education',
            handler: () => {
              this.category = 'Music and education';
            }
          },
          {
            text: 'Holidays and tickets',
            handler: () => {
              this.category = 'Holidays and tickets';
            }
          },
          {
            text: 'Animals',
            handler: () => {
              this.category = 'Animals';
            }
          },
          {
            text: 'Clothes and lifestyle',
            handler: () => {
              this.category = 'Clothes and lifestyle';
            }
          },
          {
            text: 'Baby and kids',
            handler: () => {
              this.category = 'Baby and kids';
            }
          },
          {
            text: 'Cancel',
            handler: () => {
              this.category = null;
            }
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }
  onLocationPicked(location: PostLocation) {
    this.form.patchValue({ location });
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

  // function to create post

  // onCreatePost() {
=======

  // onCreateOffer() {
>>>>>>> 7447fbb5043fec184343d4e0f55f88bfd98d297a
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
  //               this.form.value.category,
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
  //           this.router.navigate(['/']);
  //         });
  //     });
  // }
}
