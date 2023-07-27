import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './services/login.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ICredentials } from 'src/app/interfaces/authentication.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private _toastrService: ToastrService,
    private _loginService: LoginService,
    private _authService: AuthenticationService,
    private _router: Router
  ) {}
  ngOnInit(): void {}

  onLogin() {
    if (this.username === '' || this.password === '') {
      this._toastrService.error('Please enter valid data');
      return;
    }

    const credentials: ICredentials = {
      username: this.username,
      password: this.password,
    };

    this._loginService.post(credentials).subscribe({
      next: (response) => {
        let data = response;
        this._authService.setAuthToken(data);
        this._router.navigate(['home']);
        this._toastrService.success('Login successfully');
      },
      error: (error) => {
        this._toastrService.error('Invalid Credentials');
      },
    });
  }
}
