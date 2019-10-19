import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { EditprofilemodalComponent } from './editprofilemodal/editprofilemodal.component';
import { EditprofilePage } from '../pages/editprofile/editprofile.page';

@NgModule({
  declarations: [PostComponent, EditprofilemodalComponent],
  imports: [IonicModule],
  exports: [PostComponent, EditprofilemodalComponent]
})
export class ComponentsModule {}
