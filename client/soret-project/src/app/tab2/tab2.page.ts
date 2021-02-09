import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  myMap: any;
  stopName: any;

  constructor(private _http: HttpService, private router: Router) {}


  async ionViewDidEnter() {
    await this.loadMap([35.5, 10]);
  }

  loadMap(arr) {
    this.myMap ? this.myMap.remove() : this.myMap;
    this.myMap = new L.Map("mapId3").setView(arr, 11.6);
    L.tileLayer(
      "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3",
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
  }

  async back() {
    this.router.navigateByUrl("/home");
  }

  async search(x) {
    console.log("me");
    !x
      ? this.loadMap([35.5, 10])
      : this._http.getStops(x).subscribe((res) => {
          console.log(res);
          if (res != []) {
            this.loadMap([res[0].stop_lat, res[0].stop_lon]);
            this.addStops(res, 0);
          }
        });
  }

  async addStops(arr, i) {
    if (!arr) {
      return;
    } else if (arr[i]) {
      await L.marker([arr[i].stop_lat, arr[i].stop_lon], {
        icon: L.icon({
          iconUrl: "../../../assets/icon/location-marker.png",
          iconSize: [40, 40],
        }),
        draggable: false,
      })
        .on("click", () => console.log("marker"))
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

}
