import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TreatmentPlanListComponent } from './components/treatment-plan-list/treatment-plan-list.component';
import { TreatmentPlanAddComponent } from './components/treatment-plan-add/treatment-plan-add.component';
import { TreatmentPlanEditComponent } from './components/treatment-plan-edit/treatment-plan-edit.component';
import { FormsModule } from '@angular/forms';
import { TreatmentPlanDeleteComponent } from './components/treatment-plan-delete/treatment-plan-delete.component';
import { TreatmentPlanViewComponent } from './components/treatment-plan-view/treatment-plan-view.component';

const components = [
  TreatmentPlanListComponent,
  TreatmentPlanAddComponent,
  TreatmentPlanEditComponent,
  TreatmentPlanDeleteComponent,
];

const modules = [CommonModule, SharedModule, FormsModule];

@NgModule({
  declarations: [...components, TreatmentPlanViewComponent],
  imports: [...modules],
})
export class TreatmentPlansModule {}
