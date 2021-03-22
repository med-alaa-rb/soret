import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';
import { HomePage } from '../pages/home/home.page';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  data: any;

  constructor(
    public _http: HttpService,
    public modalController: ModalController,
    private toastController: ToastController,
    public alertController: AlertController,
    private menu: MenuController
  ) {}

  async ngOnInit() {
    await this._http.createFav();
    if (!this._http.userChecked) {
      await this.welcomePage();
    }
  }

  async ionViewDidEnter() {
    var ret = await Storage.get({ key: 'soret-quickAcc' });
    this.data = await JSON.parse(ret.value);
  }

  async access(name) {
    this._http.modalData = name.id;
    const modal = await this.modalController.create({
      component: TripInfoPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  async welcomePage() {
    const modal = await this.modalController.create({
      component: HomePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
  async deleteItem(el) {
    this._http.rmFavStops(el);
    const toast = await this.toastController.create({
      message: 'stop deleted!!',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
    this.ionViewDidEnter();
  }

  async default() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>restart the app</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          handler: async () => {
            await Storage.clear();
            // await this._http.createFav();
            await this.ngOnInit();
          },
        },
      ],
    });

    await alert.present();
  }
}
