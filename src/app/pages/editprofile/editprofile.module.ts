import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';

import { EditprofilePage } from './editprofile.page';

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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditprofilePage]
})
export class EditprofilePageModule {}
