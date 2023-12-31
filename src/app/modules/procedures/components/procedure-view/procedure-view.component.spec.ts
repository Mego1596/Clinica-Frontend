import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureViewComponent } from './procedure-view.component';

describe('ProcedureViewComponent', () => {
  let component: ProcedureViewComponent;
  let fixture: ComponentFixture<ProcedureViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureViewComponent]
    });
    fixture = TestBed.createComponent(ProcedureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
