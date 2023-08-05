import { TestBed } from '@angular/core/testing';

import { PrescriptionDetailService } from './prescription-detail.service';

describe('PrescriptionDetailService', () => {
  let service: PrescriptionDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
