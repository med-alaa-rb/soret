import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
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
    public _http: HttpService
  ) {}

  async ngOnInit() {
    await this._http.getStopTimes(this._http.popoverData).subscribe((res) => {
      console.log(res);
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

  async lclNotification() {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Title',
          body: 'Body',
          id: 1,
          schedule: { at: new Date(Date.now() + 5000) },
          sound: '../../../assets/notification_sound.mp3',
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
    console.log('scheduled notifications', notifs);
    this.activeNotication();
  }
}
