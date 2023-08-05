import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionDetailsAddComponent } from './components/prescription-details-add/prescription-details-add.component';
import { PrescriptionDetailsEditComponent } from './components/prescription-details-edit/prescription-details-edit.component';
import { PrescriptionDetailsDeleteComponent } from './components/prescription-details-delete/prescription-details-delete.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  PrescriptionDetailsAddComponent,
  PrescriptionDetailsEditComponent,
  PrescriptionDetailsDeleteComponent,
];

const modules = [CommonModule, SharedModule, ReactiveFormsModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class PrescriptionDetailsModule {}
