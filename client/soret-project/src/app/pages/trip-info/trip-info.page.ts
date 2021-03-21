import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { SettingsService } from '../../settings.service';
import { PopoverController } from '@ionic/angular';
import { ChooseStopsComponent } from '../../components/choose-stops/choose-stops.component';
import { ComfirmPosPage } from '../comfirm-pos/comfirm-pos.page';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.page.html',
  styleUrls: ['./trip-info.page.scss'],
})
export class TripInfoPage implements OnInit {
  myMap: any;
  info: any;

  constructor(
    public modalController: ModalController,
    public _http: HttpService,
    public setting: SettingsService,
    private popoverController: PopoverController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    var obj = { uP: this._http.userLocation, uD: this._http.modalData };
    this._http.postDesId(obj).subscribe(async (res) => {
      if (!res[0]) {
        await this.loadMap([35.5, 10]);
        return;
      } else {
        this.info = await res;
        await this.loadMap([res[0].stop_lat, res[0].stop_lon]);
        this.addStops(res, 0);
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
      this.setting.mapStrArr[this.setting.count],
      this.setting.mapObjArr[this.setting.count]
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
        .addTo(this.myMap)
        .bindPopup(`<h5>${arr[i].stop_name}</h5>`)
        .openPopup();
      if (arr[i++]) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }
  async addUserInfo() {
    if (this._http.userLocation['lat']) {
      await L.marker(
        [this._http.userLocation.lat, this._http.userLocation.lng],
        {
          icon: L.icon({
            iconUrl: '../../../assets/icon/favpng_craft-pizza-beer.png',
            iconSize: [40, 40],
          }),
          draggable: false,
        }
      )
        .addTo(this.myMap)
        .bindPopup(`<h5>your actual position</h5>`)
        .openPopup();
    } else if (this._http.userDes.lat) {
      await L.marker([this._http.userDes.lat, this._http.userDes.lng], {
        icon: L.icon({
          iconUrl:
            '../../../assets/icon/kisspng-computer-icons-nationality-elite-advertising-event-marker-5ace9a3bed7e14.2182282915234893399728.png',
          iconSize: [60, 60],
        }),
        draggable: false,
      })
        .addTo(this.myMap)
        .bindPopup(`<h5>Destination</h5>`)
        .openPopup();
    }
    const toast = await this.toastController.create({
      message: 'if something wrong check your position again',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }

  async recheckPos() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ComfirmPosPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }
}
