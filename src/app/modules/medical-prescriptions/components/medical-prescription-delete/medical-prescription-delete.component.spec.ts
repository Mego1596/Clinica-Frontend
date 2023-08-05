import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPrescriptionDeleteComponent } from './medical-prescription-delete.component';

describe('MedicalPrescriptionDeleteComponent', () => {
  let component: MedicalPrescriptionDeleteComponent;
  let fixture: ComponentFixture<MedicalPrescriptionDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalPrescriptionDeleteComponent]
    });
    fixture = TestBed.createComponent(MedicalPrescriptionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
