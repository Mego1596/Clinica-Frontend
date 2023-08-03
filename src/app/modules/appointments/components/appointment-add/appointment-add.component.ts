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
import { AppointmentService } from '../../services/appointment.service';
import { IAppointment } from '../../interfaces/appointment.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DoctorService } from 'src/app/modules/doctors/services/doctor.service';

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
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss'],
})
export class AppointmentAddComponent {
  appointmentAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  doctors = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _appointmentService: AppointmentService,
    private _doctorService: DoctorService,
    private _authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<AppointmentAddComponent>
  ) {
    this.appointmentAddForm = this._formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      medicalRecordNumber: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
    });

    this._doctorService.getDoctors().subscribe({
      next: (response: any) => {
        this.doctors = response;
      },
    });
  }

  onSubmit() {
    if (this.appointmentAddForm.valid) {
      const formData: any = this.appointmentAddForm.value;
      const payload: IAppointment = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        medicalRecordNumber: formData.medicalRecordNumber,
        doctor: formData.doctor,
      };
      this._appointmentService.create(payload).subscribe({
        next: (response) => {
          this._toastrService.success('Cita guardada con éxito');
          this._dialogReference.close(response);
        },
        error: (error) => {
          const errorData = this._authenticationService.snakeToCamel(
            error.error
          );
          if ('error' in errorData) this._toastrService.error(errorData.error);
          if (errorData.duration !== '' && 'duration' in errorData)
            this._toastrService.error(errorData.duration);
          if (errorData.outOfBusiness !== '' && 'outOfBusiness' in errorData)
            this._toastrService.error(errorData.outOfBusiness);
          if (errorData.wrapLunchTime !== '' && 'wrapLunchTime' in errorData)
            this._toastrService.error(errorData.wrapLunchTime);
          if (errorData.lunchTimeCross !== '' && 'lunchTimeCross' in errorData)
            this._toastrService.error(errorData.lunchTimeCross);
          if (errorData.sameDay !== '' && 'sameDay' in errorData)
            this._toastrService.error(errorData.sameDay);
        },
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
