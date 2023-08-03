import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guards/authentication/noauth/no-auth.guard';
import { authGuard } from './guards/authentication/auth/auth.guard';
import { verifyPermissionGuard } from './guards/permission/verify-permission.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [authGuard, verifyPermissionGuard],
    data: { permission: '--viewperson' },
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./modules/doctors/doctors.module').then((m) => m.DoctorsModule),
    canActivate: [authGuard, verifyPermissionGuard],
    data: { permission: '--viewdoctor' },
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./modules/patients/patients.module').then(
        (m) => m.PatientsModule
      ),
    canActivate: [authGuard, verifyPermissionGuard],
    data: { permission: '--viewpatient' },
  },
  {
    path: 'procedures',
    loadChildren: () =>
      import('./modules/procedures/procedures.module').then(
        (m) => m.ProceduresModule
      ),
    canActivate: [authGuard, verifyPermissionGuard],
    data: { permission: '--viewprocedure' },
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./modules/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
    canActivate: [authGuard, verifyPermissionGuard],
    data: { permission: '--viewappointment' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
