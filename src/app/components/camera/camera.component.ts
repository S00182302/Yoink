import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { StoredataService } from 'src/app/services/storedata.service';
import { FilePath } from '@ionic-native/file-path/ngx';

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
    private filePath: FilePath,
    private localStorage: StoredataService
  ) {}

  openGallery = async () => {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select an Image',
      buttons: [
        {
          text: 'Load from Gallery',
          icon: 'image',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  };

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 50,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
    };

    this.camera.getPicture(options).then(imagePath => {
      this.getSystemURL(imagePath);
    });
  }

  private getSystemURL(imageFileUri: any): void {
    this.filePath.resolveNativePath(imageFileUri).then(nativepath => {
      this.picture = nativepath;
      this.localStorage.setImagePath(nativepath).then(res => {
        console.log('native path of image SET!');
      });
    });
  }
  ngOnInit() {}
}
