import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { IMedicalPrescription } from '../interfaces/medical-prescription.interface';
@Injectable({
  providedIn: 'root',
})
export class MedicalPrescriptionService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.medicalPrescription.list}${
        pageNumber ? `?page=${pageNumber}` : ''
      }`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.medicalPrescription.get(id)}`);
  }

  getMedicalPrescriptions(appointmentId: number) {
    return this._http.get(
      `${ROUTES.medicalPrescription.getMedicalPrescriptions(appointmentId)}`
    );
  }

  create(payload: IMedicalPrescription): Observable<any> {
    return this._http.post(`${ROUTES.medicalPrescription.create}`, payload);
  }

  update(id: number, payload: IMedicalPrescription): Observable<any> {
    return this._http.put(`${ROUTES.medicalPrescription.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.medicalPrescription.delete(id)}`);
  }
}
