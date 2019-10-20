import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { EditprofilemodalComponent } from './editprofilemodal/editprofilemodal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PostComponent, EditprofilemodalComponent],
  imports: [IonicModule, CommonModule],
  exports: [PostComponent, EditprofilemodalComponent]
})
export class ComponentsModule {}
