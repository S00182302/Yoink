import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { StoredataService } from 'src/app/services/storedata.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  base64Image: any;
  images = [];
  @Output() outImagePath: EventEmitter<string> = new EventEmitter();

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private localStorage: StoredataService,
    private webView: WebView,
    private file: File,
    private platform: Platform,
    private storage: Storage,
    private ref: ChangeDetectorRef
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
    var options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let data = imageData;
        // let c = this.webView.convertFileSrc(data);
        let s = data.substr(0, data.length - 14);
        this.base64Image = s;
        console.log(this.base64Image, 's');
      },
      err => {
        // Handle error
      }
    );

    // this.camera.getPicture(options).then(imagePath => {
    //   if (
    //     this.platform.is('android') &&
    //     sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
    //   ) {
    //     this.filePath.resolveNativePath(imagePath).then(filePath => {
    //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //       let currentName = imagePath.substring(
    //         imagePath.lastIndexOf('/') + 1,
    //         imagePath.lastIndexOf('?')
    //       );
    //       this.copyFileToLocalDir(
    //         correctPath,
    //         currentName,
    //         this.createFileName()
    //       );
    //     });
    //   } else {
    //     var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //     var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //     this.copyFileToLocalDir(
    //       correctPath,
    //       currentName,
    //       this.createFileName()
    //     );
    //   }
    // });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        success => {
          this.updateStoredImages(newFileName);
        },
        error => {
          // this.presentToast('Error while storing file.');
        }
      );
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webView.convertFileSrc(img);
      return converted;
    }
  }

  updateStoredImages(name) {
    this.storage.get('images').then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set('images', JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set('images', JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  ngOnInit() {}
}
