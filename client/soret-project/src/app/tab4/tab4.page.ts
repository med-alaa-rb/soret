import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(public settings: SettingsService,private router: Router) {}

  async ngOnInit() {
    this.settings.cardChoice();
  }

  selectStyle(num) {
    this.settings.changeMaps(num);
    this.router.navigate(['home'])
  }
}
