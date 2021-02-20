import { Component, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;
const { Storage } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit {
  list: any;
  searchList: any;

  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  async ngAfterViewInit() {
    await this._http.getStops('allData').subscribe((res) => {
      this.searchList = res;
    });
  }

  async searchStops(x) {
    console.log(x);
    if (!x) {
      x = 'allData';
    } else {
      await this._http.getStops(x).subscribe((res) => {
        this.searchList = res;
      });
    }
  }

  // async createList(arr, i) {
  //   if (!arr[i]) {
  //     return;
  //   } else {
  //     this.list = await document.createElement("ion-item");
  //     this.list.appendChild(document.createTextNode(arr[i].stop_name));
  //     this.list.appendChild(
  //       document.createAttribute("click")
  //     ).value = this.getCoords(arr[i].stop_id);
  //     await document.querySelector("ion-list").appendChild(this.list);
  //     if (arr[i++].stop_name) {
  //       return this.createList(arr, i);
  //     }
  //   }
  // }

  async getCoords(el) {
    this._http.modalData = el.stop_id;
    this._http.userDes = { lat: el.stop_lat, lng: el.stop_lon };
    const modal = await this.modalController.create({
      component: TripInfoPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  async addToFav(el, id) {
    console.log(el);
    id.name = 'star';
    await Storage.set({
      key: el.stop_name,
      value: el.stop_id,
    });
    await Toast.show({
      text: 'stop add to your favorite!!',
    });
    // console.log(el);
  }
}
