import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentsComponent } from './appointments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentAddComponent } from './components/appointment-add/appointment-add.component';
import { AppointmentEditComponent } from './components/appointment-edit/appointment-edit.component';
import { AppointmentDeleteComponent } from './components/appointment-delete/appointment-delete.component';

const components = [
  AppointmentsComponent,
  AppointmentAddComponent,
  AppointmentEditComponent,
  AppointmentDeleteComponent,
];
const modules = [
  CommonModule,
  AppointmentsRoutingModule,
  SharedModule,
  ReactiveFormsModule,
  FullCalendarModule,
];
@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class AppointmentsModule {}
