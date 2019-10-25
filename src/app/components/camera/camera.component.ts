import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { YoinkService } from 'src/app/services/yoink.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  picture: any;
  convertedPicture: any;
  @Output() outPicture: EventEmitter<string> = new EventEmitter();

  constructor(
    private camera: Camera,
    private webView: WebView,
    public actionSheetController: ActionSheetController,
    private file: File,
    private yoinkService: YoinkService
  ) {}

  createPost = () => {};

  emitPicture = () => {
    this.outPicture.emit(this.picture);
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

  takePicture = (sourceType: PictureSourceType) => {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        let filename = imageData.substring(imageData.lastIndexOf('/') + 1);
        let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
        //then use the method reasDataURL  btw. var_picture is ur image variable
        this.file.readAsDataURL(path, filename).then(res => {
          this.picture = res;
          this.emitPicture();
        });
      },
      err => {
        console.log(err);
      }
    );
  };

  // copyFileToLocalDir = (namePath, imageName, newFileName) => {
  //   this.file
  //     .copyFile(namePath, imageName, this.file.dataDirectory, newFileName)
  //     .then(_ => {
  //       //add file to a local dir.
  //     });
  // };

  // convertImageURL = img => {
  //   if (img === null) {
  //     return 'image is null';
  //   } else {
  //     let converted = this.webView.convertFileSrc(img);
  //     return converted;
  //   }
  // };

  // createFileName = () => {
  //   let d = new Date();
  //   let n = d.getTime();
  //   let newFileName = n + '.jpg';
  //   return newFileName;
  // };

  ngOnInit() {}
}
