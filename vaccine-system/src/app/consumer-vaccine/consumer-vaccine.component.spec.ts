import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerVaccineComponent } from './consumer-vaccine.component';

describe('ConsumerVaccineComponent', () => {
  let component: ConsumerVaccineComponent;
  let fixture: ComponentFixture<ConsumerVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
