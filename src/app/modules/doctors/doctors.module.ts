import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorAddComponent } from './components/doctor-add/doctor-add.component';
import { DoctorViewComponent } from './components/doctor-view/doctor-view.component';
import { DoctorDeleteComponent } from './components/doctor-delete/doctor-delete.component';
import { DoctorEditComponent } from './components/doctor-edit/doctor-edit.component';

const components = [
  DoctorsComponent,
  DoctorListComponent,
  DoctorAddComponent,
  DoctorViewComponent,
  DoctorDeleteComponent,
  DoctorEditComponent,
];
const modules = [
  CommonModule,
  DoctorsRoutingModule,
  SharedModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class DoctorsModule {}
