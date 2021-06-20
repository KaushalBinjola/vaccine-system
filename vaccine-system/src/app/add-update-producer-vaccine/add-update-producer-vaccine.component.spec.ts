import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProducerVaccineComponent } from './add-update-producer-vaccine.component';

describe('AddUpdateProducerVaccineComponent', () => {
  let component: AddUpdateProducerVaccineComponent;
  let fixture: ComponentFixture<AddUpdateProducerVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateProducerVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateProducerVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
