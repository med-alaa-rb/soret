import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-choose-stops',
  templateUrl: './choose-stops.component.html',
  styleUrls: ['./choose-stops.component.scss'],
})
export class ChooseStopsComponent implements OnInit {
  popData: any;
  constructor(public _http: HttpService) {}

  async ngOnInit() {
    await this._http.getStopTimes(this._http.popoverData).subscribe((res) => {
      console.log(res);
      this.popData = res;
    });
  }
}
