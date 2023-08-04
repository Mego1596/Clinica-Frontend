export interface ITreatmentPlan {
  id?: number;
  isActive: boolean;
  patient: number;
  procedures: Array<IProcedureTreatment>;
}

export interface IProcedureTreatmentPlan {
  id: number;
  name?: string;
  description?: string;
  fees: number;
  numberOfPieces: number;
}

export interface IProcedureTreatment {
  procedure: number;
  fees: number;
  numberOfPieces: number;
}
