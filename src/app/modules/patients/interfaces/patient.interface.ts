import { IPerson } from '../../users/interfaces/user.interface';

interface IMedicalRecord {
  dentalHistory: string;
  medicalHistory: string;
}

export interface IPatient {
  occupation?: string;
  birthDate: string;
  workAddress?: string;
  parentName?: string;
  referred?: string;
  person: IPerson;
  medicalRecord: IMedicalRecord;
}
