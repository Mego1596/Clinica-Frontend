import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { ITreatmentPlan } from '../interfaces/treatment-plan.interface';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.treatmentPlan.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  getTreatmentPlans(patientId: string, pageNumber?: number) {
    return this._http.get(
      `${ROUTES.treatmentPlan.getTreatmentPlans(patientId)}${
        pageNumber ? `?page=${pageNumber}` : ''
      }`
    );
  }

  getTreatmentPlan(patientId: string) {
    return this._http.get(
      `${ROUTES.treatmentPlan.getTreatmentPlan(patientId)}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.treatmentPlan.get(id)}`);
  }

  create(payload: ITreatmentPlan): Observable<any> {
    return this._http.post(`${ROUTES.treatmentPlan.create}`, payload);
  }

  update(id: number, payload: ITreatmentPlan): Observable<any> {
    return this._http.put(`${ROUTES.treatmentPlan.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.treatmentPlan.delete(id)}`);
  }
}
