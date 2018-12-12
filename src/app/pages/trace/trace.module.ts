import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TracePage } from './trace.page';

import { AgmCoreModule } from "@agm/core";

const routes: Routes = [
  {
    path: '',
    component: TracePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBNbYgy4obXZxNzJZn3WUhbsS0Go6AQMSc'}),
    RouterModule.forChild(routes)
  ],
  declarations: [TracePage]
})
export class TracePageModule {}
