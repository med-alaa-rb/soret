import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComfirmPosPage } from './comfirm-pos.page';

const routes: Routes = [
  {
    path: '',
    component: ComfirmPosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComfirmPosPageRoutingModule {}
