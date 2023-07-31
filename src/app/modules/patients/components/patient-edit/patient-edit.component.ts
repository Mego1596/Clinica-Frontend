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
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent {
  patientEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  patientId: number = 0;
  today: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _patientService: PatientService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.today = tomorrow.toISOString().split('T')[0];
    this.patientEditForm = this._formBuilder.group({
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
    this.loadPatientData();
  }

  loadPatientData() {
    this._route.params.subscribe({
      next: (params) => {
        this.patientId = params['id'];
        if (this.patientId) {
          this._patientService.get(this.patientId).subscribe({
            next: (response: any) => {
              const patient = response;
              const birthDate = new Date(patient.birthDate);
              const formattedBirthDate = new Date(
                birthDate.getFullYear(),
                birthDate.getMonth(),
                birthDate.getDate() + 1,
                0,
                0,
                0
              );

              const patientData = {
                occupation: patient.occupation,
                birthDate: formattedBirthDate,
                parentName: patient.parentName,
                referred: patient.referred,
                workAddress: patient.workAddress,
                dentalHistory: patient.medicalRecord.dentalHistory,
                medicalHistory: patient.medicalRecord.medicalHistory,
                firstName: patient.person.firstName,
                middleName: patient.person.middleName,
                lastName: patient.person.lastName,
                maternalLastName: patient.person.maternalLastName,
                address: patient.person.address,
                gender: patient.person.gender,
                phoneNumber: patient.person.phoneNumber,
                email: patient.person.user.email,
              };
              this.patientEditForm.patchValue(patientData);
            },
          });
        }
      },
    });
  }

  onSubmit() {
    if (this.patientEditForm.valid) {
      const originalDate = new Date(this.patientEditForm.value.birthDate);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const day = originalDate.getDate().toString().padStart(2, '0');

      const formData: any = this.patientEditForm.value;
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

      this._patientService.update(this.patientId, payload).subscribe({
        next: (response) => {
          this._toastrService.success('Paciente modificado con éxito');
          this._router.navigate(['/patients']);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
