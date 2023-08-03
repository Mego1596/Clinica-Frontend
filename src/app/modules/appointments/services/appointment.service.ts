import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { IAppointment } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.appointment.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.appointment.get(id)}`);
  }

  getAppointments(viewStartDate: string, viewEndDate: string) {
    return this._http.get(
      `${ROUTES.appointment.getAppointments(viewStartDate, viewEndDate)}`
    );
  }

  create(payload: IAppointment): Observable<any> {
    return this._http.post(`${ROUTES.appointment.create}`, payload);
  }

  update(id: number, payload: IAppointment): Observable<any> {
    return this._http.put(`${ROUTES.appointment.update(id)}`, payload);
  }

  patch(id: number, payload: any): Observable<any> {
    return this._http.patch(`${ROUTES.appointment.patch(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.appointment.delete(id)}`);
  }
}
