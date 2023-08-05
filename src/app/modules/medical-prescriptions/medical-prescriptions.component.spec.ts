import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPrescriptionsComponent } from './medical-prescriptions.component';

describe('MedicalPrescriptionsComponent', () => {
  let component: MedicalPrescriptionsComponent;
  let fixture: ComponentFixture<MedicalPrescriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalPrescriptionsComponent]
    });
    fixture = TestBed.createComponent(MedicalPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
