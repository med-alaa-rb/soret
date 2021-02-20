import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { PopoverController } from '@ionic/angular';
import { ChooseStopsComponent } from '../../components/choose-stops/choose-stops.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.page.html',
  styleUrls: ['./trip-info.page.scss'],
})
export class TripInfoPage {
  myMap: any;
  info: any;

  constructor(
    private router: Router,
    public modalController: ModalController,
    public _http: HttpService,
    private popoverController: PopoverController
  ) {}

  async ionViewDidEnter() {
    var obj = { uP: this._http.userLocation, uD: this._http.modalData };
    console.log(obj);
    this._http.postDesId(obj).subscribe(async (res) => {
      console.log(res);
      if (res) {
        this.info = await res;
        await this.loadMap([res[0].stop_lat, res[0].stop_lon]);
        this.addStops(res, 0);
      } else {
        this.loadMap([35.5, 10]);
      }
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async loadMap(arr) {
    this.myMap ? this.myMap.remove() : this.myMap;
    this.myMap = await new L.Map('mapId1').setView(arr, 11.6);
    L.tileLayer(
      'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
    await this.addUserInfo();
  }

  async checkTime(id) {
    this._http.popoverData = id;
    const popover = await this.popoverController.create({
      component: ChooseStopsComponent,
      cssClass: 'pop',
    });
    return await popover.present();
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
        .on('click', () => console.log('marker'))
        .bindPopup(`<h5>${arr[i].stop_name}</h5>`)
        .openPopup()
        .addTo(this.myMap);
      if (arr[i++]) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }
  async addUserInfo() {
    console.log(this._http.userDes);
    await L.marker([this._http.userLocation.lat, this._http.userLocation.lng], {
      icon: L.icon({
        iconUrl: '../../../assets/icon/favpng_craft-pizza-beer.png',
        iconSize: [40, 40],
      }),
      draggable: false,
    })
      .bindPopup(`<h5>your actual position</h5>`)
      .openPopup()
      .addTo(this.myMap);
    await L.marker([this._http.userDes.lat, this._http.userDes.lng], {
      icon: L.icon({
        iconUrl:
          '../../../assets/icon/kisspng-computer-icons-nationality-elite-advertising-event-marker-5ace9a3bed7e14.2182282915234893399728.png',
        iconSize: [40, 40],
      }),
      draggable: false,
    })
      .bindPopup(`<h5>Destination</h5>`)
      .openPopup()
      .addTo(this.myMap);
  }
}
