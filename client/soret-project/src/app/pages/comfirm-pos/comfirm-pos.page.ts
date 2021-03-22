import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { SettingsService } from '../../settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comfirm-pos',
  templateUrl: './comfirm-pos.page.html',
  styleUrls: ['./comfirm-pos.page.scss'],
})
export class ComfirmPosPage implements OnInit {
  map: any;
  dragMarker: any;
  constructor(
    public setting: SettingsService,
    private modalctrl: ModalController,
    public _http: HttpService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.setting.cardChoice();
  }

  async ionViewDidEnter() {
    if (!this._http.nonComfirmedLocation[0]) {
      await this._http.locate(null);
    }
    await this.loadMap([
      this._http.nonComfirmedLocation.lat,
      this._http.nonComfirmedLocation.lng,
    ]);
    await this.userAddMarker();
    await this.loadToast();
  }

  loadMap(arr) {
    this.map ? this.map.remove() : this.map;
    this.map = new L.Map('mapId2').setView(arr, 11.6);
    L.tileLayer(
      this.setting.mapStrArr[this.setting.count],
      this.setting.mapObjArr[this.setting.count]
    ).addTo(this.map);
    console.log('end map');
  }

  async userAddMarker() {
    this.dragMarker = await L.marker(
      [
        this._http.nonComfirmedLocation.lat,
        this._http.nonComfirmedLocation.lng,
      ],
      {
        icon: L.icon({
          iconUrl: '../../../assets/icon/favpng_craft-pizza-beer.png',
          iconSize: [40, 40],
        }),
        draggable: true,
      }
    )
      .addTo(this.map)
      .on('click', () => console.log('marker'))
      .bindPopup(`<h5>Drag your actual position</h5>`)
      .openPopup();
  }

  closeModal() {
    this._http.locate(this.dragMarker['_latlng']);
    !this._http.userChecked;
    this.modalctrl.dismiss();
  }

  async loadToast() {
    const toast = await this.toastController.create({
      message: 'Kindly, comfirm your position',
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }
}
