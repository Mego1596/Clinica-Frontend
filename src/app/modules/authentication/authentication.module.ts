import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const components = [AuthenticationComponent, LoginComponent];
const modules = [
  CommonModule,
  AuthenticationRoutingModule,
  SharedModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
})
export class AuthenticationModule {}
