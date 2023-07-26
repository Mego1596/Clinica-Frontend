import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionCheckService {
  constructor() {}

  validate(permission: string) {
    const userData = localStorage.getItem('userData') || undefined;
    const user = userData ? JSON.parse(userData).user : undefined;
    if (!user) {
      return false;
    }

    return user.isAdmin ? true : user.permissions.includes(permission);
  }
}
