import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-comfirm-pos',
  templateUrl: './comfirm-pos.page.html',
  styleUrls: ['./comfirm-pos.page.scss'],
})
export class ComfirmPosPage implements OnInit {
  map: any;
  constructor(
    private modalctrl: ModalController,
    private router: Router,
    public _http: HttpService
  ) {}

  ngOnInit() {
    this.createMap();
  }

  async createMap() {
    var map = await L.map('mapId2', {
      center: [25.3791924, 55.4765436],
      zoom: 15,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);
  }
  closeModal() {
    !this._http.userChecked;
    this.modalctrl.dismiss();
  }
}
