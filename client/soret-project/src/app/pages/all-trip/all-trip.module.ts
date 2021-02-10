import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTripPageRoutingModule } from './all-trip-routing.module';

import { AllTripPage } from './all-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTripPageRoutingModule
  ],
  declarations: [AllTripPage]
})
export class AllTripPageModule {}
