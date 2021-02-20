import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  userDes: any = {};
  userLocation: any = {};
  modalData: any;
  userChecked: boolean = false;
  popoverData: any;
  allTripData: any;

  quickAccData: any = [
    { id: 416, value: 'hopital' },
    { id: 371, value: 'finances Mansoura' },
    { id: 386, value: 'center des etudes islamique' },
    { id: 392, value: 'garde national' },
    { id: 403, value: 'stade ' },
    { id: 451, value: 'gare' },
  ];

  constructor(private http: HttpClient) {}
  ROOT_URL = 'http://localhost:3000';

  getStops(id) {
    !id ? (id = ' ') : id;
    return this.http.get(this.ROOT_URL + `/data/api/2020/stops/${id}`);
  }

  postDesId(obj) {
    return this.http.post(this.ROOT_URL + `/data/api/sendUserDestination`, obj);
  }
  getStopTimes(id) {
    return this.http.get(this.ROOT_URL + `/data/api/2020/stopsTimes/${id}`);
  }
  getShapes(id) {
    return this.http.get(this.ROOT_URL + `/data/2020/data/shapes/${id}`);
  }
  async locate(obj) {
    if (!obj) {
      const coordinates = await Geolocation.getCurrentPosition();

      this.userLocation['lng'] = coordinates['coords']['longitude'];
      this.userLocation['lat'] = coordinates['coords']['latitude'];
    } else {
      this.userLocation['lng'] = obj['lng'];
      this.userLocation['lat'] = obj['lat'];
    }
  }

  async createFav(arr) {
    for (var i = 0; i < arr.length; i++) {
      await Storage.set({
        key: arr[i].value,
        value: arr[i].id,
      });
    }
    var data = await Storage.keys();
    return data.keys;
  }
}
