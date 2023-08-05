import { TestBed } from '@angular/core/testing';

import { MedicalPrescriptionService } from './medical-prescription.service';

describe('MedicalPrescriptionService', () => {
  let service: MedicalPrescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalPrescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
