import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDeleteComponent } from './procedure-delete.component';

describe('ProcedureDeleteComponent', () => {
  let component: ProcedureDeleteComponent;
  let fixture: ComponentFixture<ProcedureDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureDeleteComponent]
    });
    fixture = TestBed.createComponent(ProcedureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
