import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailsDeleteComponent } from './prescription-details-delete.component';

describe('PrescriptionDetailsDeleteComponent', () => {
  let component: PrescriptionDetailsDeleteComponent;
  let fixture: ComponentFixture<PrescriptionDetailsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionDetailsDeleteComponent]
    });
    fixture = TestBed.createComponent(PrescriptionDetailsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
