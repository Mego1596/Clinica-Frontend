import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { SnakeToCamelCaseInterceptor } from './interceptors/snake-to-camel-case/snake-to-camel-case.interceptor';

const modules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  SharedModule,
  HttpClientModule,
  ToastrModule.forRoot(),
];

const components = [AppComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SnakeToCamelCaseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
