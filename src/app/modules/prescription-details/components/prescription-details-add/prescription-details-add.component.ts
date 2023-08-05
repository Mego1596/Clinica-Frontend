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
  selector: 'app-prescription-details-add',
  templateUrl: './prescription-details-add.component.html',
  styleUrls: ['./prescription-details-add.component.scss'],
})
export class PrescriptionDetailsAddComponent {
  prescriptionDetailsAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _prescriptionDetailService: PrescriptionDetailService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<PrescriptionDetailsAddComponent>
  ) {
    this.prescriptionDetailsAddForm = this._formBuilder.group({
      medication: ['', [Validators.required]],
      dose: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.prescriptionDetailsAddForm.valid) {
      const formData: any = this.prescriptionDetailsAddForm.value;
      const payload: IPrescriptionDetail = {
        medication: formData.medication,
        dose: formData.dose,
        quantity: formData.quantity,
        medicalPrescription: this.data.id,
      };
      this._prescriptionDetailService.create(payload).subscribe({
        next: () => {
          this._toastrService.success('Detalle agregado con éxito');
          this._dialogReference.close(true);
        },
        error: () => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
