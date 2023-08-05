import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payments-delete',
  templateUrl: './payments-delete.component.html',
  styleUrls: ['./payments-delete.component.scss'],
})
export class PaymentsDeleteComponent {
  constructor(
    private _paymentService: PaymentService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<PaymentsDeleteComponent>
  ) {}

  onDelete() {
    this._paymentService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Pago eliminado con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
