import { Component, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';
import { ComfirmPosPage } from '../pages/comfirm-pos/comfirm-pos.page';
import { ToastController } from '@ionic/angular';

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
    public modalController: ModalController,
    private toastController: ToastController
  ) {}

  async ngAfterViewInit() {
    await this._http.getStops('allData').subscribe((res) => {
      this.searchList = res;
    });
    // this.anim(0);
  }

  async searchStops(x) {
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
    console.log('loc', this._http.userLocation);
    if (!this._http.userLocation.lat) {
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

  async addToFav(el, id) {
    console.log(el);
    id.name = 'star';

    this._http.addFavStops(el);
    const toast = await this.toastController.create({
      message: 'stop add to quick access page',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  // async anim(x) {
  //   var el = (arg) =>  document.getElementById(`el${arg}`);
  //   setTimeout(async() => {
  //     el(x).className += await 'animation-targett';
  //   }, 1500);
  //   el(x).className
  //   if (!el(x++)) {
  //     return;
  //   } else {
  //     return this.anim(x++);
  //   }
  // }
}
