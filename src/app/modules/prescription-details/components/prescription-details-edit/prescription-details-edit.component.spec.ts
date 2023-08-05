import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailsEditComponent } from './prescription-details-edit.component';

describe('PrescriptionDetailsEditComponent', () => {
  let component: PrescriptionDetailsEditComponent;
  let fixture: ComponentFixture<PrescriptionDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionDetailsEditComponent]
    });
    fixture = TestBed.createComponent(PrescriptionDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
