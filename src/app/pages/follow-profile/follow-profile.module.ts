import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowProfilePage } from './follow-profile.page';

const routes: Routes = [
  {
    path: '',
    component: FollowProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FollowProfilePage],
  exports: [FollowProfilePage]
})
export class FollowProfilePageModule {}
