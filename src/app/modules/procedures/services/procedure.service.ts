import { Injectable } from '@angular/core';
import { ROUTES } from 'src/app/api/routes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProcedure } from '../interfaces/procedure.interface';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.procedure.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.procedure.get(id)}`);
  }

  getProcedures() {
    return this._http.get(`${ROUTES.procedure.getProcedures}`);
  }

  create(payload: IProcedure): Observable<any> {
    return this._http.post(`${ROUTES.procedure.create}`, payload);
  }

  update(id: number, payload: IProcedure): Observable<any> {
    return this._http.put(`${ROUTES.procedure.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.procedure.delete(id)}`);
  }
}
