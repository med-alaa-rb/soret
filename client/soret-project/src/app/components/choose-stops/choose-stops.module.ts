import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChooseStopsComponent } from './choose-stops.component';

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, IonicModule],
  declarations: [ChooseStopsComponent],
})
export class ChooseStopsComponentModule {}
