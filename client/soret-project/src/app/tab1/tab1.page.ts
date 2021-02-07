import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalController } from '@ionic/angular';
import { TripInfoPage } from '../pages/trip-info/trip-info.page';
import { HomePage } from '../pages/home/home.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit, OnInit {
  list: any;
  searchList: any;

  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    if (!this._http.userChecked) {
      this.welcomePage();
    }
  }

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
    this._http.modalData = el;
    const modal = await this.modalController.create({
      component: TripInfoPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  async welcomePage() {
    const modal = await this.modalController.create({
      component: HomePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
