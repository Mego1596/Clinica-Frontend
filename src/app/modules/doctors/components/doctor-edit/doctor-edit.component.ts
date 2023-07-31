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
import { GroupService } from 'src/app/modules/groups/services/group.service';
import { DoctorService } from '../../services/doctor.service';
import { IDoctor } from '../../interfaces/doctor.interface';

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
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss'],
})
export class DoctorEditComponent {
  doctorEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  groups = [];
  doctorId: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _doctorService: DoctorService,
    private _groupService: GroupService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.doctorEditForm = this._formBuilder.group({
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
    this.loadDoctorData();
    this._groupService.getGroups(['Doctor', 'Asistente']).subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (error) => {},
    });
  }

  loadDoctorData() {
    this._route.params.subscribe({
      next: (params) => {
        this.doctorId = params['id'];
        if (this.doctorId) {
          this._doctorService.get(this.doctorId).subscribe({
            next: (response: any) => {
              const doctor = response;
              const doctorData = {
                medicalLicenseNumber: doctor.medicalLicenseNumber,
                firstName: doctor.person.firstName,
                middleName: doctor.person.middleName,
                lastName: doctor.person.lastName,
                maternalLastName: doctor.person.maternalLastName,
                address: doctor.person.address,
                gender: doctor.person.gender,
                phoneNumber: doctor.person.phoneNumber,
                email: doctor.person.user.email,
                groups: doctor.person.user.groups.pop(),
              };
              this.doctorEditForm.patchValue(doctorData);
            },
          });
        }
      },
    });
  }

  onSubmit() {
    if (this.doctorEditForm.valid) {
      const formData: any = this.doctorEditForm.value;
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

      this._doctorService.update(this.doctorId, payload).subscribe({
        next: (response) => {
          this._toastrService.success('Doctor modificado con éxito');
          this._router.navigate(['/doctors']);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
