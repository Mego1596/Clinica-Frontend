import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorAddComponent } from './components/doctor-add/doctor-add.component';
import { DoctorEditComponent } from './components/doctor-edit/doctor-edit.component';
import { verifyPermissionGuard } from 'src/app/guards/permission/verify-permission.guard';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: '',
        component: DoctorListComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--viewdoctor' },
      },
      {
        path: 'add',
        component: DoctorAddComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--adddoctor' },
      },
      {
        path: 'edit/:id',
        component: DoctorEditComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--changedoctor' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
