import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTripPage } from './all-trip.page';

const routes: Routes = [
  {
    path: '',
    component: AllTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTripPageRoutingModule {}
