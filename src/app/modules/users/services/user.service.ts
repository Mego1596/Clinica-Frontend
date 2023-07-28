import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';
import { IPerson } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  list(pageNumber?: number): Observable<any> {
    return this._http.get(
      `${ROUTES.user.list}${pageNumber ? `?page=${pageNumber}` : ''}`
    );
  }

  get(id: number) {
    return this._http.get(`${ROUTES.user.get(id)}`);
  }

  create(payload: IPerson): Observable<any> {
    return this._http.post(`${ROUTES.user.create}`, payload);
  }

  update(id: number, payload: IPerson): Observable<any> {
    return this._http.put(`${ROUTES.user.update(id)}`, payload);
  }

  delete(id: number) {
    return this._http.delete(`${ROUTES.user.delete(id)}`);
  }
}
