import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { EditprofilemodalComponent } from '../controllers/editprofilemodal/editprofilemodal.component';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { BarcodescannerComponent } from './barcodescanner/barcodescanner.component';
import { CameraComponent } from './camera/camera.component';
import { AlbumComponent } from './album/album.component';
import { CommentComponent } from './comment/comment.component';
import { PostPopoverComponent } from '../controllers/post-popover/post-popover.component';
import { PostPopoverContentComponent } from './post-popover-content/post-popover-content.component';
import { RouterModule } from '@angular/router';
import { FilterPopoverContentComponent } from './filter-popover-content/filter-popover-content.component';

@NgModule({
  entryComponents: [
    MapModalComponent,
    PostPopoverContentComponent,
    FilterPopoverContentComponent
  ],
  declarations: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent,
    AlbumComponent,
    PostPopoverComponent,
    PostPopoverContentComponent,
    FilterPopoverContentComponent,
    CommentComponent
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
    FilterPopoverContentComponent,
    CommentComponent
  ]
})
export class ComponentsModule {}
