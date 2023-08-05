import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPrescriptionEditComponent } from './medical-prescription-edit.component';

describe('MedicalPrescriptionEditComponent', () => {
  let component: MedicalPrescriptionEditComponent;
  let fixture: ComponentFixture<MedicalPrescriptionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalPrescriptionEditComponent]
    });
    fixture = TestBed.createComponent(MedicalPrescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
