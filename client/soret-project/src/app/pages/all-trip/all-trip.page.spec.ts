import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllTripPage } from './all-trip.page';

describe('AllTripPage', () => {
  let component: AllTripPage;
  let fixture: ComponentFixture<AllTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTripPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
