import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  FormControl,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { IPayment } from '../../interfaces/payment.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const is_submitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || is_submitted)
    );
  }
}
@Component({
  selector: 'app-payments-edit',
  templateUrl: './payments-edit.component.html',
  styleUrls: ['./payments-edit.component.scss'],
})
export class PaymentsEditComponent {
  paymentsEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<PaymentsEditComponent>
  ) {
    this.paymentsEditForm = this._formBuilder.group({
      income: [this.data.income, [Validators.required]],
      description: [this.data.description, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.paymentsEditForm.valid) {
      const formData: any = this.paymentsEditForm.value;
      const payload: IPayment = {
        income: formData.income,
        description: formData.description,
        appointment: this.data.appointment,
      };
      this._paymentService.update(this.data.id, payload).subscribe({
        next: () => {
          this._toastrService.success('Pago modificado con éxito');
          this._dialogReference.close(true);
        },
        error: () => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
