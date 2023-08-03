export interface IAppointment {
  startDate: string;
  endDate: string;
  doctor: number;
  patient?: number;
  medicalRecordNumber?: string;
  description: string;
  treatmentPlan?: number | null;
}
