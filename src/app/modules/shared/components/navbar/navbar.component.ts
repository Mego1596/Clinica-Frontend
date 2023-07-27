import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() drawer!: MatDrawer;

  constructor(private _authenticationService: AuthenticationService) {}

  isAuthenticated() {
    return this._authenticationService.isLoggedIn();
  }

  logout() {
    this._authenticationService.logout();
  }
}
