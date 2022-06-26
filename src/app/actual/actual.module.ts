import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualPageRoutingModule } from './actual-routing.module';

import { ActualPage } from './actual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualPageRoutingModule
  ],
  declarations: [ActualPage]
})
export class ActualPageModule {}
