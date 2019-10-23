import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowingPage } from './following.page';
import { FollowProfilePage } from '../follow-profile/follow-profile.page';
import { FollowProfilePageModule } from '../follow-profile/follow-profile.module';

const routes: Routes = [
  {
    path: '',
    component: FollowingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    // FollowProfilePageModule
  ],
  declarations: [FollowingPage],
  exports: [FollowingPage]
})
export class FollowingPageModule {}
