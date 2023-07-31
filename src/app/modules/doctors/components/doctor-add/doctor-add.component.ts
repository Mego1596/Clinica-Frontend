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
import { DoctorService } from '../../services/doctor.service';
import { IDoctor } from '../../interfaces/doctor.interface';
import { GroupService } from 'src/app/modules/groups/services/group.service';

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
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss'],
})
export class DoctorAddComponent {
  doctorAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  groups = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _doctorService: DoctorService,
    private _groupService: GroupService,
    private _router: Router
  ) {
    this.doctorAddForm = this._formBuilder.group({
      medicalLicenseNumber: [
        '',
        [Validators.required, Validators.pattern('^JVPO-\\d+$')],
      ],
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
      groups: ['', [Validators.required]],
    });

    this._groupService.getGroups(['Doctor', 'Asistente']).subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (error) => {},
    });
  }

  onSubmit() {
    if (this.doctorAddForm.valid) {
      const formData: any = this.doctorAddForm.value;
      const payload: IDoctor = {
        medicalLicenseNumber: formData.medicalLicenseNumber,
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
            groups: [formData.groups] || [],
          },
        },
      };
      this._doctorService.create(payload).subscribe({
        next: (response) => {
          this._toastrService.success('Doctor agregado con éxito');
          this._router.navigate(['/doctors']);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
