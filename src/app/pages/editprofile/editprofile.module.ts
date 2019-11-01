import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { EditprofilePage } from './editprofile.page';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: EditprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicStorageModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditprofilePage]
})
export class EditprofilePageModule {}
