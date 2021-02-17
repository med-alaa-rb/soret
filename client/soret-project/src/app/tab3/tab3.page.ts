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
    this.data = await this._http.createFav(this._http.quickAccData);
    console.log(this.data);
    if (!this._http.userChecked) {
      this.welcomePage();
    }
  }

  async access(name) {
    const { value } = await Storage.get({ key: name });
    this._http.modalData = await JSON.parse(value);
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
}
