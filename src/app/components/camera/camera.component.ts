import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StoredataService } from 'src/app/services/storedata.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  picture: any;
  convertedPicture: any;

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private localStorage: StoredataService
  ) {}

  openGallery = () => {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  };

  async takePicture(sourceType: PictureSourceType) {
    await this.localStorage.clearImagePath().then(res => {
      console.log(res);
    });

    const options: CameraOptions = {
      quality: 50,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    this.camera.getPicture(options).then(
      async imageData => {
        this.picture = 'data:image/jpeg;base64,' + imageData;

        await this.localStorage.setImagePath(this.picture);
      },
      err => {
        // Handle error
      }
    );
  }

  ngOnInit() {}
}
