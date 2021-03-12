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
    { id: 403, value: 'stade' },
    { id: 451, value: 'gare' },
  ];

  constructor(private http: HttpClient) {}
  ROOT_URL = 'http://192.168.43.52:2700';

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
  getPictures() {
    return this.http.get(this.ROOT_URL + '/api/soret/welcomePic');
  }
  checkKeys(arr) {
    return this.http.post(this.ROOT_URL + '/api/2020/data/checkStorage', arr);
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

  async createFav() {
    var data = await Storage.keys();
    this.checkKeys(data).subscribe(async (res) => {
      if (!res) {
        await Storage.set({
          key: 'soret-quickAcc',
          value: JSON.stringify(this.quickAccData),
        });
      }
    });
  }

  async picArr() {
    var result = [];
    for (var i = 0; i <= 13; i++) {
      var data = `../assets/welcomeIcon/${i}.png`;
      result.push(data);
    }
    return result;
  }
  addFavStops(obj) {
    this.quickAccData.push({ id: obj.stop_id, value: obj.stop_name });
    console.log('length', this.quickAccData.length);
    Storage.set({
      key: 'soret-quickAcc',
      value: JSON.stringify(this.quickAccData),
    });
  }

  async rmFavStops(obj) {
    console.log(obj);
    var ret = await Storage.get({ key: 'soret-quickAcc' });
    var user = await JSON.parse(ret.value);
    var arr = [];
    for (var i = 0; i < user.length; i++) {
      if (user[i].value != obj.value.toLowerCase()) {
        arr.push(user[i]);
      }
    }
    await Storage.set({ key: 'soret-quickAcc', value: JSON.stringify(arr) });
  }
}
