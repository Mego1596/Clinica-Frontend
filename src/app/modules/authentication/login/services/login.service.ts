import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../../api/routes';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  post(data: any): Observable<any> {
    return this._http.post(ROUTES.authentication.login, data);
  }

  refreshToken(data: any): Observable<any> {
    return this._http.post(ROUTES.authentication.refresh, data);
  }
}
