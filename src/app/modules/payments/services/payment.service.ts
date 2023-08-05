import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { IPayment } from '../interfaces/payment.interface';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.payment.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.payment.get(id)}`);
  }

  getPayments(appointmentId: number) {
    return this._http.get(`${ROUTES.payment.getPayments(appointmentId)}`);
  }

  create(payload: IPayment): Observable<any> {
    return this._http.post(`${ROUTES.payment.create}`, payload);
  }

  update(id: number, payload: IPayment): Observable<any> {
    return this._http.put(`${ROUTES.payment.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.payment.delete(id)}`);
  }
}
