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
import { PopoverComponent } from '../controllers/popover/popover.component';
import { PostPopoverContentComponent } from './post-popover-content/post-popover-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  entryComponents: [MapModalComponent, PostPopoverContentComponent],
  declarations: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent,
    AlbumComponent,
    PostPopoverComponent,
    PostPopoverContentComponent,
    PopoverComponent
  ],
  imports: [IonicModule, CommonModule, RouterModule],
  exports: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent,
    AlbumComponent,
    PostPopoverComponent,
    PostPopoverContentComponent,
    PopoverComponent
  ]
})
export class ComponentsModule {}
