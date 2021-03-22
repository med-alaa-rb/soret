import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})

// the settings services will handle map background and notification time
export class SettingsService {
  count: number = null;

  mapStrArr: Array<string> = [
    'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  ];

  mapObjArr: Array<Object> = [
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
    },
    {
      idattribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
  ];

  constructor(public _http: HttpService) {}

  async cardChoice() {
    console.log('settiiiiings');
    const { keys } = await Storage.keys();
    this._http.checkMapStyle(keys).subscribe(async (res) => {
      if (!res) {
        await Storage.set({
          key: 'soret-cardChoice',
          value: JSON.stringify(1),
        });
        const { value } = await Storage.get({ key: 'soret-cardChoice' });
    
        this.count = JSON.parse(value);
      } else {
        const { value } = await Storage.get({ key: 'soret-cardChoice' });

        this.count = JSON.parse(value);
      }
    });
  }

  async changeMaps(num: number) {
    await Storage.set({
      key: 'soret-cardChoice',
      value: JSON.stringify(num),
    });
    const { value } = await Storage.get({ key: 'soret-cardChoice' });
    this.count = JSON.parse(value);

  }
}

//rail
// var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });
