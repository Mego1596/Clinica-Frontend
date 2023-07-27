import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { IAuthToken } from '../../interfaces/authentication.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _router: Router) {}

  setAuthToken(data: IAuthToken) {
    const decodedToken = jwtDecode<any>(data.refresh);
    localStorage.setItem(
      'userData',
      JSON.stringify(this.snakeToCamel(decodedToken))
    );
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
  }

  removeAuthToken() {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isLoggedIn() {
    const token = AuthenticationService.getAccessToken();
    const userData = localStorage.getItem('userData') || undefined;
    if (!token) {
      return false;
    }

    if (!userData) {
      return false;
    }

    const expirationTime = JSON.parse(userData).exp;
    const expirationDate = new Date(expirationTime * 1000);
    const currentDate = new Date();
    return currentDate < expirationDate;
  }

  static getAccessToken() {
    const token = localStorage.getItem('accessToken') || undefined;
    return token;
  }

  static getRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken') || undefined;
    return refreshToken;
  }

  logout() {
    this.removeAuthToken();
    this._router.navigate(['/login']);
  }

  snakeToCamel(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.snakeToCamel(item));
    }

    if (typeof obj === 'object') {
      const camelCaseObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const camelCaseKey = this.toCamelCase(key);
          camelCaseObj[camelCaseKey] = this.snakeToCamel(obj[key]);
        }
      }
      return camelCaseObj;
    }

    return obj;
  }

  toCamelCase(snakeCaseString: string): string {
    return snakeCaseString.replace(/(_\w)/g, (match) => match[1].toUpperCase());
  }
}
