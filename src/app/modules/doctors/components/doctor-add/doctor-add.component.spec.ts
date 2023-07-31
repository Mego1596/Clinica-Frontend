import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddComponent } from './doctor-add.component';

describe('DoctorAddComponent', () => {
  let component: DoctorAddComponent;
  let fixture: ComponentFixture<DoctorAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAddComponent]
    });
    fixture = TestBed.createComponent(DoctorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
