import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { EditprofilemodalComponent } from './editprofilemodal/editprofilemodal.component';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { BarcodescannerComponent } from './barcodescanner/barcodescanner.component';
import { CameraComponent } from './camera/camera.component';
import { AlbumComponent } from './album/album.component';
import { PostPopoverComponent } from './post-popover/post-popover.component';

@NgModule({
  entryComponents: [MapModalComponent],
  declarations: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent,
    AlbumComponent,
    PostPopoverComponent
  ],
  imports: [IonicModule, CommonModule],
  exports: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent,
    AlbumComponent,
    PostPopoverComponent
  ]
})
export class ComponentsModule {}
