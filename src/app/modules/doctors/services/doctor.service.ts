import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { IDoctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.doctor.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.doctor.get(id)}`);
  }

  getDoctors() {
    return this._http.get(ROUTES.doctor.getDoctors);
  }

  create(payload: IDoctor): Observable<any> {
    return this._http.post(`${ROUTES.doctor.create}`, payload);
  }

  update(id: number, payload: IDoctor): Observable<any> {
    return this._http.put(`${ROUTES.doctor.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.doctor.delete(id)}`);
  }
}
