import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowingPage } from './following.page';
import { FollowProfilePage } from '../follow-profile/follow-profile.page';

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
  ],
  declarations: [FollowingPage, FollowProfilePage]
})
export class FollowingPageModule {}
