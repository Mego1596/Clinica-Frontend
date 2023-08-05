import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsAddComponent } from './components/payments-add/payments-add.component';
import { PaymentsEditComponent } from './components/payments-edit/payments-edit.component';
import { PaymentsComponent } from './payments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaymentsDeleteComponent } from './components/payments-delete/payments-delete.component';

const components = [
  PaymentsAddComponent,
  PaymentsEditComponent,
  PaymentsDeleteComponent,
  PaymentsComponent,
];

const modules = [CommonModule, ReactiveFormsModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class PaymentsModule {}
