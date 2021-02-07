import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComfirmPosPageRoutingModule } from './comfirm-pos-routing.module';

import { ComfirmPosPage } from './comfirm-pos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComfirmPosPageRoutingModule
  ],
  declarations: [ComfirmPosPage]
})
export class ComfirmPosPageModule {}
