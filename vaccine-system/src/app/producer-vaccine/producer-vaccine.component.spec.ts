import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerVaccineComponent } from './producer-vaccine.component';

describe('ProducerVaccineComponent', () => {
  let component: ProducerVaccineComponent;
  let fixture: ComponentFixture<ProducerVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
