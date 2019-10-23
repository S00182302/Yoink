import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { EditprofilemodalComponent } from './editprofilemodal/editprofilemodal.component';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { BarcodescannerComponent } from './barcodescanner/barcodescanner.component';

@NgModule({
  entryComponents: [MapModalComponent],
  declarations: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent
  ],
  imports: [IonicModule, CommonModule],
  exports: [
    PostComponent,
    EditprofilemodalComponent,
    MapModalComponent,
    BarcodescannerComponent
  ]
})
export class ComponentsModule {}
