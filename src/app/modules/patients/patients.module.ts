import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { PatientViewComponent } from './components/patient-view/patient-view.component';

const components = [
  PatientsComponent,
  PatientListComponent,
  PatientAddComponent,
  PatientEditComponent,
  PatientViewComponent,
];
const modules = [
  CommonModule,
  PatientsRoutingModule,
  SharedModule,
  ReactiveFormsModule,
];
@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class PatientsModule {}
