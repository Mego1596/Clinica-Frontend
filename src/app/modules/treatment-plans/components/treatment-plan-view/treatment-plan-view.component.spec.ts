import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPlanViewComponent } from './treatment-plan-view.component';

describe('TreatmentPlanViewComponent', () => {
  let component: TreatmentPlanViewComponent;
  let fixture: ComponentFixture<TreatmentPlanViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentPlanViewComponent]
    });
    fixture = TestBed.createComponent(TreatmentPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
