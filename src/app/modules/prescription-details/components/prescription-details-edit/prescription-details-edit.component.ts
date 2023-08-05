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
import { IPrescriptionDetail } from '../../interfaces/prescription-detail.interface';
import { PrescriptionDetailService } from '../../services/prescription-detail.service';

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
  selector: 'app-prescription-details-edit',
  templateUrl: './prescription-details-edit.component.html',
  styleUrls: ['./prescription-details-edit.component.scss'],
})
export class PrescriptionDetailsEditComponent {
  prescriptionDetailsEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _prescriptionDetailService: PrescriptionDetailService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<PrescriptionDetailsEditComponent>
  ) {
    this.prescriptionDetailsEditForm = this._formBuilder.group({
      medication: [this.data.medication, [Validators.required]],
      dose: [this.data.dose, [Validators.required]],
      quantity: [this.data.quantity, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.prescriptionDetailsEditForm.valid) {
      const formData: any = this.prescriptionDetailsEditForm.value;
      const payload: IPrescriptionDetail = {
        medication: formData.medication,
        dose: formData.dose,
        quantity: formData.quantity,
        medicalPrescription: this.data.medicalPrescription,
      };
      this._prescriptionDetailService.update(this.data.id, payload).subscribe({
        next: (response) => {
          this._toastrService.success('Detalle modificado con éxito');
          this._dialogReference.close(true);
        },
        error: () => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
