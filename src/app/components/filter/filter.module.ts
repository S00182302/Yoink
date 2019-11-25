import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilterComponent } from './filter.component';

const routes: Routes = [
  {
    path: '',
    component: FilterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FilterComponent
  ],
  declarations: []
})
export class FilterComponentModule {}
