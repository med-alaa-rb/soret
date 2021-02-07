import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { HttpService } from "../../http.service";
import { ComfirmPosPage } from "../comfirm-pos/comfirm-pos.page";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
const { Geolocation } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    public modalController: ModalController,
    public _http: HttpService,
    public router: Router
  ) {}

  ngOnInit() {
    this.locate();
  }

  async getStarted() {
    this.modalController.dismiss()
    const modal = await this.modalController.create({
      component: ComfirmPosPage,
      cssClass: "my-custom-class",
    });

    return await modal.present()
    // this.router.navigateByUrl("tabs");
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this._http.userLocation.lng = coordinates["coords"]["longitude"];
    this._http.userLocation.lat = coordinates["coords"]["latitude"];
    console.log(this._http.userLocation);
  }
}
