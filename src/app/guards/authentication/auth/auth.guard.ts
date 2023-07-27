import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthenticationService).isLoggedIn()) {
    return true;
  } else {
    inject(AuthenticationService).removeAuthToken();
    inject(Router).navigate(['login']);
    return false;
  }
};
