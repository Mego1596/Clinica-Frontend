import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailsAddComponent } from './prescription-details-add.component';

describe('PrescriptionDetailsAddComponent', () => {
  let component: PrescriptionDetailsAddComponent;
  let fixture: ComponentFixture<PrescriptionDetailsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionDetailsAddComponent]
    });
    fixture = TestBed.createComponent(PrescriptionDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
