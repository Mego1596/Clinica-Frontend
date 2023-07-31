import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTES } from 'src/app/api/routes';
import { Observable } from 'rxjs';
import { IPatient } from '../interfaces/patient.interface';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.patient.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.patient.get(id)}`);
  }

  create(payload: IPatient): Observable<any> {
    return this._http.post(`${ROUTES.patient.create}`, payload);
  }

  update(id: number, payload: IPatient): Observable<any> {
    return this._http.put(`${ROUTES.patient.update(id)}`, payload);
  }
}
