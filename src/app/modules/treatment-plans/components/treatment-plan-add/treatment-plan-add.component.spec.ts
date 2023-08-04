import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPlanAddComponent } from './treatment-plan-add.component';

describe('TreatmentPlanAddComponent', () => {
  let component: TreatmentPlanAddComponent;
  let fixture: ComponentFixture<TreatmentPlanAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentPlanAddComponent]
    });
    fixture = TestBed.createComponent(TreatmentPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
