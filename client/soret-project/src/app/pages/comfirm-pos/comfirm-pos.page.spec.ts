import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComfirmPosPage } from './comfirm-pos.page';

describe('ComfirmPosPage', () => {
  let component: ComfirmPosPage;
  let fixture: ComponentFixture<ComfirmPosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComfirmPosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComfirmPosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
