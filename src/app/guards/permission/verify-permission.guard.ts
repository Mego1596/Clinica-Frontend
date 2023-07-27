import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';

export const verifyPermissionGuard: CanActivateFn = (route, state) => {
  const permission: string = route.data['permission'];

  if (inject(PermissionCheckService).validate(permission)) {
    return true;
  } else {
    inject(Router).navigate(['/home']);
    return false;
  }
};
