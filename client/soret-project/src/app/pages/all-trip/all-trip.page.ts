import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpService } from '../../http.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-all-trip',
  templateUrl: './all-trip.page.html',
  styleUrls: ['./all-trip.page.scss'],
})
export class AllTripPage {
  myMap: any;
  markerLayer: any;

  constructor(
    private _http: HttpService,
    private router: Router,
    public modalController: ModalController
  ) {}

  async ionViewDidEnter() {
    this.loadMap([35.5, 10]);
    this._http.getShapes(this._http.allTripData).subscribe(async (res) => {
      console.log(res);
      if (res) {
        await this.loadMap([res[0].stop_lat, res[0].stop_lon]);
        await this.addStops(res, 0);
      } else {
        return;
      }
    });
  }

  async loadMap(arr) {
    this.myMap ? this.myMap.remove() : this.myMap;
    this.myMap = await new L.Map('mapId5').setView(arr, 11.6);
    L.tileLayer(
      'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
  }

  async addStops(arr, i) {
    if (!arr) {
      return;
    } else if (arr[i]) {
     this.markerLayer = await L.marker([arr[i].shape_pt_lat, arr[i].shape_pt_lon], {
        icon: L.icon({
          iconUrl: '../../../assets/icon/custom-marker-icon.png',
          iconSize: [7, 7],
        }),
        draggable: false,
      }).addTo(this.myMap);
      if (arr[i++]) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }
  close() {
    this.modalController.dismiss();
  }
}
