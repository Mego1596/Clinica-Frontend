import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDeleteComponent } from './doctor-delete.component';

describe('DoctorDeleteComponent', () => {
  let component: DoctorDeleteComponent;
  let fixture: ComponentFixture<DoctorDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorDeleteComponent]
    });
    fixture = TestBed.createComponent(DoctorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
