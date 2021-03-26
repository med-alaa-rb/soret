import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { SettingsService } from '../../settings.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AllTripPage } from '../../pages/all-trip/all-trip.page';

const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-choose-stops',
  templateUrl: './choose-stops.component.html',
  styleUrls: ['./choose-stops.component.scss'],
})
export class ChooseStopsComponent implements OnInit {
  data: any;
  constructor(
    private toastController: ToastController,
    public _http: HttpService,
    public settings: SettingsService,
    public modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this._http.getStopTimes(this._http.popoverData).subscribe((res) => {
      this.data = res;
    });
  }

  async activeNotication() {
    const toast = await this.toastController.create({
      message: 'User was added successfully',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  async lclNotification(icon, time) {
    this._http.makeNotTime([time]).subscribe(async (res) => {
      var x = res[0] - this.settings.notification * 1000;
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Title',
            body: 'Body',
            id: 1,
            schedule: { at: new Date(Date.now() + x) },
            sound: '../../../assets/notification_sound.mp3',
            attachments: null,
            actionTypeId: '',
            extra: null,
          },
        ],
      });
    });
    icon.name = 'notifications';
    icon.color = 'danger';
    console.log(time);
    await this.activeNotication();
  }

  async showAll(id) {
    this._http.allTripData = id;
    const modal = await this.modalCtrl.create({
      component: AllTripPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  notificationTime(time) {
    // var arr = await time.split(":");
    // let year = await new Date(new Date().getUTCFullYear());
    // let month = await new Date(new Date().getMonth());
    // let day = await new Date(new Date().getDay());
    // let hour = (JSON.parse(arr[0]) + 1).toString();
    // console.log(new Date(year, month, day, hour, arr[1], arr[2]))
    // return new Date(year, month, day, hour, arr[1], arr[2]);
  }
}
