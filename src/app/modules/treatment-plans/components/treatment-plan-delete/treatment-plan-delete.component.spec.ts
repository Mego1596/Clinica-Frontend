import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPlanDeleteComponent } from './treatment-plan-delete.component';

describe('TreatmentPlanDeleteComponent', () => {
  let component: TreatmentPlanDeleteComponent;
  let fixture: ComponentFixture<TreatmentPlanDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentPlanDeleteComponent]
    });
    fixture = TestBed.createComponent(TreatmentPlanDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
