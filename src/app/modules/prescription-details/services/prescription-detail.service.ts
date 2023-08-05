import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { IPrescriptionDetail } from '../interfaces/prescription-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionDetailService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.prescriptionDetail.list}${
        pageNumber ? `?page=${pageNumber}` : ''
      }`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.prescriptionDetail.get(id)}`);
  }

  getPrescriptionDetails(medicalPrescriptionId: number) {
    return this._http.get(
      `${ROUTES.prescriptionDetail.getPrescriptionDetails(
        medicalPrescriptionId
      )}`
    );
  }

  create(payload: IPrescriptionDetail): Observable<any> {
    return this._http.post(`${ROUTES.prescriptionDetail.create}`, payload);
  }

  update(id: number, payload: IPrescriptionDetail): Observable<any> {
    return this._http.put(`${ROUTES.prescriptionDetail.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.prescriptionDetail.delete(id)}`);
  }
}
