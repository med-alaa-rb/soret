import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { ComfirmPosPage } from '../comfirm-pos/comfirm-pos.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  arrPictures: any = [];
  pic: any;

  constructor(
    public modalController: ModalController,
    public _http: HttpService,
  ) {}

  async ngOnInit() {
    this.arrPictures = this._http.picArr()['__zone_symbol__value'];
    this.pic = await this.welcomePic(this.arrPictures);
    await this._http.locate(null);
    this.makeText();
  }

  async getStarted() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ComfirmPosPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

  async welcomePic(arr) {
    var val = await Math.ceil(Math.random() * Math.random() * 13);
    return arr[val];
  }

  makeText() {
    document.getElementById('id1').innerHTML =
      '<strong>welcome to kairouan</strong>';
  }
}
