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
import { LocationHandlerComponent } from './location-handler/location-handler.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  entryComponents: [
    MapModalComponent,
    PostPopoverContentComponent,
    FilterPopoverContentComponent,
    LocationHandlerComponent
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
    CommentComponent,
    LocationHandlerComponent,
    LocationPickerComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    CommonModule,
    IonicSelectableModule
  ],
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
    CommentComponent,
    LocationHandlerComponent
  ]
})
export class ComponentsModule {}
