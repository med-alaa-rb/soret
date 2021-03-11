import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { ComfirmPosPage } from '../comfirm-pos/comfirm-pos.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  arrPictures: any = [];
  count: number = 0;
  pic: any = this.welcomePic(this.arrPictures);

  constructor(
    public modalController: ModalController,
    public _http: HttpService,
    public router: Router,
    public navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.arrPictures = this._http.picArr()['__zone_symbol__value'];
    await this._http.locate(null);
    this.makeText();
  }

  async getStarted() {
    this.count++;
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ComfirmPosPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

  async welcomePic(arr) {
    
    if (this.count === 14) {
      this.count = 0;
      return arr[this.count];
    }
    else {
      return arr[this.count];
    }
  }

  makeText() {
    document.getElementById('id1').innerHTML =
      '<strong>welcome to kairouan</strong>';
  }
}
