import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.page.html',
  styleUrls: ['./trip-info.page.scss'],
})
export class TripInfoPage implements AfterViewInit, OnInit {
  myMap: any;
  constructor(
    private router: Router,
    public modalController: ModalController,
    public _http: HttpService
  ) {}

  ngOnInit() {
    var obj = { uP: this._http.userLocation, uD: this._http.modalData.stop_id };
    this._http.postDesId(obj).subscribe((res) => {
      console.log(res);
    });
  }

  ngAfterViewInit() {
    this.createMap();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async createMap() {
    (await this.myMap) ? this.myMap.remove() : this.myMap;
    this.myMap = await L.map('mapId1').setView([51.505, -0.09], 13);

    L.tileLayer(
      'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
  }
}
