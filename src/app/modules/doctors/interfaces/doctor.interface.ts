import { IPerson } from '../../users/interfaces/user.interface';

export interface IDoctor {
  medicalLicenseNumber: string;
  person: IPerson;
}
