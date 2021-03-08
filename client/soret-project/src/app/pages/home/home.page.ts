import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { ComfirmPosPage } from '../comfirm-pos/comfirm-pos.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  arrPictures: any = [];
  count: number = 0;
  pic: any;

  constructor(
    public modalController: ModalController,
    public _http: HttpService,
    public router: Router,
    public navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.arrPictures = this._http.picArr()['__zone_symbol__value'];
    await this._http.locate(null);
    this.makeText()
  }

  async getStarted() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ComfirmPosPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

  welcomePic(arr, x) {
    x === 13 ? (x = 0) : x++;
    return arr[x];
  }

  makeText() {
    document.getElementById('id1').innerHTML =
      '<strong>welcome to kairouan</strong>';
  }
}
