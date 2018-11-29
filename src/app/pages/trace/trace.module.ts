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
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAUuGueymk1hn4V5t8kjo1uSMZKBihCYfU'}),
    RouterModule.forChild(routes)
  ],
  declarations: [TracePage]
})
export class TracePageModule {}
