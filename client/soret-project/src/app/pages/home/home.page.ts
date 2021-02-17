import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { ComfirmPosPage } from '../comfirm-pos/comfirm-pos.page';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public modalController: ModalController,
    public _http: HttpService,
    public router: Router
  ) {}

  ngOnInit() {
    this._http.locate(null);
  }

  async getStarted() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ComfirmPosPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }
}
