import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPrescriptionAddComponent } from './medical-prescription-add.component';

describe('MedicalPresciptionAddComponent', () => {
  let component: MedicalPrescriptionAddComponent;
  let fixture: ComponentFixture<MedicalPrescriptionAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalPrescriptionAddComponent],
    });
    fixture = TestBed.createComponent(MedicalPrescriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
