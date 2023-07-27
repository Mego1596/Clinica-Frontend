import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  catchError,
  switchMap,
  throwError,
  filter,
  take,
  finalize,
} from 'rxjs';
import { LoginService } from '../../modules/authentication/login/services/login.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private static _isRefreshing: boolean = false;
  private _refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private _loginService: LoginService,
    private _authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.convertToSnakeCase(request);
    request = this.addAuthorizationHeader(request);

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 403) {
          if (!AuthInterceptor._isRefreshing) {
            AuthInterceptor._isRefreshing = true;
            this._refreshTokenSubject.next(null);
            const payload = {
              refresh: AuthenticationService.getRefreshToken(),
            };
            return this._loginService.refreshToken(payload).pipe(
              switchMap((response) => {
                localStorage.setItem('accessToken', response.access);
                this._refreshTokenSubject.next(response);
                return next.handle(this.addAuthorizationHeader(request));
              }),
              catchError((error) => {
                this._authenticationService.logout();
                return throwError(error);
              }),
              finalize(() => {
                AuthInterceptor._isRefreshing = false;
              })
            );
          } else {
            return this._refreshTokenSubject.pipe(
              filter((response) => response !== null),
              take(1),
              switchMap(() => {
                return next.handle(this.addAuthorizationHeader(request));
              })
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
  private addAuthorizationHeader(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const token = AuthenticationService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

  private convertToSnakeCase(request: HttpRequest<any>): HttpRequest<any> {
    if (request.body instanceof Object) {
      const snakeCaseBody = this.convertObjectKeysToSnakeCase(request.body);
      return request.clone({ body: snakeCaseBody });
    }
    return request;
  }

  private convertObjectKeysToSnakeCase(data: any): any {
    if (data instanceof Array) {
      return data.map((item) => this.convertObjectKeysToSnakeCase(item));
    } else if (data instanceof Object) {
      const convertedData: any = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const snakeCaseKey = key
            .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
            .replace(/^_/, '');
          convertedData[snakeCaseKey] = this.convertObjectKeysToSnakeCase(
            data[key]
          );
        }
      }
      return convertedData;
    }
    return data;
  }
}
