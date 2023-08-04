import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPlanEditComponent } from './treatment-plan-edit.component';

describe('TreatmentPlanEditComponent', () => {
  let component: TreatmentPlanEditComponent;
  let fixture: ComponentFixture<TreatmentPlanEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentPlanEditComponent]
    });
    fixture = TestBed.createComponent(TreatmentPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
