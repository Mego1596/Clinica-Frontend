import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { verifyPermissionGuard } from 'src/app/guards/permission/verify-permission.guard';
import { PatientsComponent } from './patients.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { TreatmentPlanListComponent } from '../treatment-plans/components/treatment-plan-list/treatment-plan-list.component';
import { TreatmentPlanAddComponent } from '../treatment-plans/components/treatment-plan-add/treatment-plan-add.component';
import { TreatmentPlanEditComponent } from '../treatment-plans/components/treatment-plan-edit/treatment-plan-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [
      {
        path: '',
        component: PatientListComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--viewpatient' },
      },
      {
        path: 'add',
        component: PatientAddComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--addpatient' },
      },
      {
        path: 'edit/:id',
        component: PatientEditComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--changepatient' },
      },
      {
        path: 'treatment-plans/:id',
        component: TreatmentPlanListComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--viewtreatmentplan' },
      },
      {
        path: 'treatment-plans/:id/add',
        component: TreatmentPlanAddComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--addtreatmentplan' },
      },
      {
        path: 'treatment-plans/:id/edit/:treatmentPlanId',
        component: TreatmentPlanEditComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--changetreatmentplan' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
