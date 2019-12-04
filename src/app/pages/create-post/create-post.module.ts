import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreatePostPage } from './create-post.page';
import { LocationPickerComponent } from 'src/app/components/location-picker/location-picker.component';
import { MapModalComponent } from 'src/app/components/map-modal/map-modal.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [CreatePostPage]
})
export class CreatePostPageModule {}
