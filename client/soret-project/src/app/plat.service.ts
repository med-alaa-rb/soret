import { Injectable } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }
}
