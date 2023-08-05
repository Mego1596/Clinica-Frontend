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
import { MedicalPrescriptionService } from '../../services/medical-prescription.service';
import { IMedicalPrescription } from '../../interfaces/medical-prescription.interface';

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
  selector: 'app-medical-presciption-add',
  templateUrl: './medical-prescription-add.component.html',
  styleUrls: ['./medical-prescription-add.component.scss'],
})
export class MedicalPrescriptionAddComponent {
  medicalPrescriptionAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _medicalPrescriptionService: MedicalPrescriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<MedicalPrescriptionAddComponent>
  ) {
    this.medicalPrescriptionAddForm = this._formBuilder.group({
      weight: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.medicalPrescriptionAddForm.valid) {
      const formData: any = this.medicalPrescriptionAddForm.value;
      const payload: IMedicalPrescription = {
        weight: formData.weight,
        appointment: this.data.appointmentId,
      };
      this._medicalPrescriptionService.create(payload).subscribe({
        next: () => {
          this._toastrService.success('Receta agregada con éxito');
          this._dialogReference.close(true);
        },
        error: () => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
