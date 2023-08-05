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
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss'],
})
export class PaymentsAddComponent {
  paymentAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<PaymentsAddComponent>
  ) {
    this.paymentAddForm = this._formBuilder.group({
      income: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.paymentAddForm.valid) {
      const formData: any = this.paymentAddForm.value;
      const payload: IPayment = {
        income: formData.income,
        description: formData.description,
        appointment: this.data.appointmentId,
      };
      this._paymentService.create(payload).subscribe({
        next: () => {
          this._toastrService.success('Pago agregado con éxito');
          this._dialogReference.close(true);
        },
        error: () => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
