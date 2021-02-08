import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  userLocation: any = {};
  modalData: any;
  userChecked: boolean = false;
  popoverData: any;

  constructor(private http: HttpClient) {}
  ROOT_URL = 'http://localhost:3000';

  getStops(id) {
    !id ? (id = ' ') : id;
    return this.http.get(this.ROOT_URL + `/data/api/2020/stops/${id}`);
  }

  postDesId(obj) {
    return this.http.post(this.ROOT_URL + `/data/api/sendUserDestination`, obj);
  }
  getStopTimes(id) {
    return this.http.get(this.ROOT_URL + `/data/api/2020/stopsTimes/${id}`);
  }
}
