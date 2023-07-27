import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  if (inject(AuthenticationService).isLoggedIn()) {
    inject(Router).navigate(['home']);
    return false;
  } else {
    return true;
  }
};
