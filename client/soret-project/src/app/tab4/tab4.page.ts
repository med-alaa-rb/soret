import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  time: any = this.settings.notification;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    public settings: SettingsService,
    private toastController: ToastController
  ) {}

  async selectStyle(num) {
    await this.settings.changeMaps(num);
    await this.loadToast();
  }

  alertTime(el) {
    this.settings.notifybefore(el);
  }

  async loadToast() {
    const toast = await this.toastController.create({
      message: 'restart the app please',
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }
}
