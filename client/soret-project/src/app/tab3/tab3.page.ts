import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  quickAccData: any = [
    { id: 416, value: 'hopital' },
    { id: 371, value: 'finances Mansoura' },
    { id: 386, value: 'center des etudes islamique' },
    { id: 392, value: 'garde national' },
    { id: 403, value: 'stade ' },
    { id: 451, value: 'gare' },
  ];

  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  async access(id) {
    this._http.modalData = id;
    console.log(this._http.modalData);
    const modal = await this.modalController.create({
      component: TripInfoPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
