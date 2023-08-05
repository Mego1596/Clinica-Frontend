import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDeleteComponent } from './payments-delete.component';

describe('PaymentsDeleteComponent', () => {
  let component: PaymentsDeleteComponent;
  let fixture: ComponentFixture<PaymentsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsDeleteComponent]
    });
    fixture = TestBed.createComponent(PaymentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
