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
  selector: 'app-medical-prescription-edit',
  templateUrl: './medical-prescription-edit.component.html',
  styleUrls: ['./medical-prescription-edit.component.scss'],
})
export class MedicalPrescriptionEditComponent {
  medicalPrescriptionEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _medicalPrescriptionService: MedicalPrescriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<MedicalPrescriptionEditComponent>
  ) {
    this.medicalPrescriptionEditForm = this._formBuilder.group({
      weight: [this.data.weight, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.medicalPrescriptionEditForm.valid) {
      const formData: any = this.medicalPrescriptionEditForm.value;
      const payload: IMedicalPrescription = {
        weight: formData.weight,
        appointment: this.data.appointment,
      };
      this._medicalPrescriptionService.update(this.data.id, payload).subscribe({
        next: () => {
          this._toastrService.success('Receta modificada con éxito');
          this._dialogReference.close(true);
        },
        error: () => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
