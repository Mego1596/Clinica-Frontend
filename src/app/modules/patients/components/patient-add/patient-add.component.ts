import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { IPatient } from '../../interfaces/patient.interface';

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
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
})
export class PatientAddComponent {
  patientAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  today: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _patientService: PatientService,
    private _router: Router
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.today = tomorrow.toISOString().split('T')[0];
    this.patientAddForm = this._formBuilder.group({
      occupation: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      workAddress: [''],
      parentName: [''],
      referred: [''],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      maternalLastName: [''],
      address: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^\\d{4}-\\d{4}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      dentalHistory: [''],
      medicalHistory: [''],
    });
  }

  onSubmit() {
    if (this.patientAddForm.valid) {
      const originalDate = new Date(this.patientAddForm.value.birthDate);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const day = originalDate.getDate().toString().padStart(2, '0');
      const formData: any = this.patientAddForm.value;
      const payload: IPatient = {
        occupation: formData.occupation,
        birthDate: `${year}-${month}-${day}`,
        workAddress: formData.workAddress,
        parentName: formData.parentName,
        referred: formData.referred,
        person: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          maternalLastName: formData.maternalLastName,
          address: formData.address,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          user: {
            email: formData.email,
            groups: [],
          },
        },
        medicalRecord: {
          dentalHistory: formData.dentalHistory,
          medicalHistory: formData.medicalHistory,
        },
      };
      this._patientService.create(payload).subscribe({
        next: (response) => {
          this._toastrService.success('Paciente agregado con éxito');
          this._router.navigate(['/patients']);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
