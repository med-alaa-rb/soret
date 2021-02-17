import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comfirm-pos',
  templateUrl: './comfirm-pos.page.html',
  styleUrls: ['./comfirm-pos.page.scss'],
})
export class ComfirmPosPage {
  map: any;
  dragMarker: any;
  constructor(
    private modalctrl: ModalController,
    private router: Router,
    public _http: HttpService,
    private toastController: ToastController
  ) {}

  async ionViewDidEnter() {
    console.log(this._http.userLocation);

    await this.loadMap([
      this._http.userLocation.lat,
      this._http.userLocation.lng,
    ]);
    await this.userAddMarker();
    await this.loadToast();
  }

  loadMap(arr) {
    this.map ? this.map.remove() : this.map;
    this.map = new L.Map('mapId2').setView(arr, 11.6);
    L.tileLayer(
      'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.map);
  }

  async userAddMarker() {
    this.dragMarker = await L.marker(
      [this._http.userLocation.lat, this._http.userLocation.lng],
      {
        icon: L.icon({
          iconUrl: '../../../assets/icon/favpng_craft-pizza-beer.png',
          iconSize: [40, 40],
        }),
        draggable: true,
      }
    )
      .on('click', () => console.log('marker'))
      .bindPopup(`<h5>check your actual position</h5>`)
      .openPopup()
      .addTo(this.map);
  }

  closeModal() {
    console.log(this.dragMarker['_latlng']);
    this._http.locate(this.dragMarker['_latlng']);
    !this._http.userChecked;
    this.modalctrl.dismiss();
  }

  async loadToast() {
    const toast = await this.toastController.create({
      message: 'Kindly, comfirm your position',
      duration: 5000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }
}
