import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { EditprofilemodalComponent } from './editprofilemodal/editprofilemodal.component';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
<<<<<<< HEAD

=======
import { BarcodescannerComponent } from './barcodescanner/barcodescanner.component';
import { CameraComponent } from './camera/camera.component';
>>>>>>> 7447fbb5043fec184343d4e0f55f88bfd98d297a

@NgModule({
  entryComponents: [MapModalComponent],
  declarations: [
    PostComponent,
    EditprofilemodalComponent,
<<<<<<< HEAD
    MapModalComponent
  
=======
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent
>>>>>>> 7447fbb5043fec184343d4e0f55f88bfd98d297a
  ],
  imports: [IonicModule, CommonModule],
  exports: [
    PostComponent,
    EditprofilemodalComponent,
<<<<<<< HEAD
    MapModalComponent
 
=======
    MapModalComponent,
    BarcodescannerComponent,
    CameraComponent
>>>>>>> 7447fbb5043fec184343d4e0f55f88bfd98d297a
  ]
})
export class ComponentsModule {}
