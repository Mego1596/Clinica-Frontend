import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicalPrescriptionsComponent } from './medical-prescriptions.component';
import { MedicalPrescriptionAddComponent } from './components/medical-presciption-add/medical-prescription-add.component';
import { MedicalPrescriptionEditComponent } from './components/medical-prescription-edit/medical-prescription-edit.component';
import { MedicalPrescriptionDeleteComponent } from './components/medical-prescription-delete/medical-prescription-delete.component';
import { PrescriptionDetailsModule } from '../prescription-details/prescription-details.module';

const componentes = [
  MedicalPrescriptionsComponent,
  MedicalPrescriptionAddComponent,
  MedicalPrescriptionEditComponent,
  MedicalPrescriptionDeleteComponent,
];

const modules = [
  CommonModule,
  SharedModule,
  ReactiveFormsModule,
  PrescriptionDetailsModule,
];

@NgModule({
  declarations: [...componentes],
  imports: [...modules],
})
export class MedicalPrescriptionsModule {}
