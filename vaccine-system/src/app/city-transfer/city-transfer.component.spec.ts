import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTransferComponent } from './city-transfer.component';

describe('CityTransferComponent', () => {
  let component: CityTransferComponent;
  let fixture: ComponentFixture<CityTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
