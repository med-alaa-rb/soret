import { Component } from '@angular/core';
import * as L from 'leaflet';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';
import { ComfirmPosPage } from '../pages/comfirm-pos/comfirm-pos.page';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  myMap: any;
  stopName: any;
  dragMarker: any;
  detail: any;

  constructor(
    private _http: HttpService,
    public modalController: ModalController
  ) {}

  async ionViewDidEnter() {
    await this.loadMap([
      this._http.userLocation.lat,
      this._http.userLocation.lng,
    ]);
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  async loadMap(arr) {
    this.myMap ? this.myMap.remove() : this.myMap;
    this.myMap = await new L.Map('mapId3').setView(arr, 8.6);
    L.tileLayer(
      'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
    await this.userAddMarker();
  }

  async userAddMarker() {
    this.dragMarker = await L.marker(
      [this._http.userLocation.lat, this._http.userLocation.lng],
      {
        icon: L.icon({
          iconUrl: '../../../assets/icon/favpng_craft-pizza-beer.png',
          iconSize: [40, 40],
        }),
        draggable: false,
      }
    )
      .addTo(this.myMap)
      .bindPopup(`<h5> your actual position</h5>`)
      .openPopup();
  }

  async search(x) {
    !x
      ? this.loadMap([35.5, 10])
      : this._http.getStops(x).subscribe(async (res) => {
          if (res != []) {
            await this.loadMap([res[0].stop_lat, res[0].stop_lon]);
            await this.addStops(res, 0);
            this.detail = res[0].stop_name;
          }
        });
  }

  async getCoords(el) {
    if (!el['stop_id']) {
      return;
    } else {
      this._http.modalData = el.stop_id;
      this._http.userDes = {
        name: el.stop_name,
        lat: el.stop_lat,
        lng: el.stop_lon,
      };
      console.log('loc', this._http.userLocation);
      if (!this._http.userLocation) {
        const modal = await this.modalController.create({
          component: ComfirmPosPage,
          cssClass: 'my-custom-class',
          swipeToClose: true,
        });
        return await modal.present();
      } else {
        const modal = await this.modalController.create({
          component: TripInfoPage,
          cssClass: 'my-custom-class',
          swipeToClose: true,
        });
        return await modal.present();
      }
    }
  }

  async addStops(arr, i) {
    if (!arr) {
      return;
    } else if (arr[i]) {
      await L.marker([arr[i].stop_lat, arr[i].stop_lon], {
        icon: L.icon({
          iconUrl: '../../../assets/icon/location-marker.png',
          iconSize: [40, 40],
        }),
        draggable: false,
      })
        .on('click', () => this.getCoords(arr[i]))
        .addTo(this.myMap)
        .bindPopup(`<h5>${arr[i].stop_name}`)
        .openPopup();
      if (arr[i++]) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }

  // async welcomePage() {
  //   if (this._http.userChecked) {
  //     return;
  //   } else {
  //     const modal = await this.modalController.create({
  //       component: HomePage,
  //       cssClass: 'my-custom-class',
  //       swipeToClose: true,
  //     });
  //     return await modal.present();
  //   }
  // }
}
