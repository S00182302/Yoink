import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { PostLocation } from 'src/app/models/location.model';

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
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  form: FormGroup;

  constructor(
    // private postsService: PostsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController

  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
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

  onPickCategory() {
    this.actionSheetCtrl
      .create({
        header: 'Please Choose',
        buttons: [
          {
            text: 'Cat 1',
            handler: () => {
              const category = 'cat 1';
            }
          },
          {
            text: 'Cat 2',
            handler: () => {
              const category = 'cat 2';
            }
          },
          { text: 'Cancel', role: 'cancel' }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }
  onLocationPicked(location: PostLocation) {
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


  // function to create post
  // onCreatePost() {
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
  //           this.router.navigate(['/']);
  //         });
  //     });
  // }

}
