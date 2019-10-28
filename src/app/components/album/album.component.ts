import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StoredataService } from 'src/app/services/storedata.service';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  imagePath: string = '';
  @Output() outImagePath: EventEmitter<string> = new EventEmitter();

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private localStorage: StoredataService
  ) {}

  emitImage = imagePath => {
    this.outImagePath.emit(imagePath);
  };

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
      destinationType: this.camera.DestinationType.NATIVE_URI
    };

    this.camera.getPicture(options).then(imagePath => {
      this.imagePath = imagePath;
      console.log(this.imagePath);
      this.emitImage(imagePath);
    });
  }

  ngOnInit() {}
}
