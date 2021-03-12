import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';
import { HomePage } from '../pages/home/home.page';
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
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    this._http.createFav();
    if (!this._http.userChecked) {
      await this.welcomePage();
    }
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
  deleteItem(el) {
    this._http.rmFavStops(el);
  }
}
