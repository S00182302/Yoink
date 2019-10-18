import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestPage } from './test.page';
import { FollowProfilePage } from '../follow-profile/follow-profile.page';
import { FollowingPage } from '../following/following.page';
import { FollowingPageModule } from '../following/following.module';
import { FollowProfilePageModule } from '../follow-profile/follow-profile.module';

const routes: Routes = [
  {
    path: '',
    component: TestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FollowingPageModule,
    FollowProfilePageModule
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
