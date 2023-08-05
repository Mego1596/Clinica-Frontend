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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { IAppointment } from '../../interfaces/appointment.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DoctorService } from 'src/app/modules/doctors/services/doctor.service';
import { AppointmentDeleteComponent } from '../appointment-delete/appointment-delete.component';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { ITreatmentPlan } from 'src/app/modules/treatment-plans/interfaces/treatment-plan.interface';
import { TreatmentPlanService } from 'src/app/modules/treatment-plans/services/treatment-plan.service';
import { PaymentsComponent } from 'src/app/modules/payments/payments.component';

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
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss'],
})
export class AppointmentEditComponent {
  appointmentEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  doctors = [];
  activeTreatmentPlan!: ITreatmentPlan;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _appointmentService: AppointmentService,
    private _doctorService: DoctorService,
    private _treatmentPlanService: TreatmentPlanService,
    private _authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<AppointmentEditComponent>,
    private _dialog: MatDialog,
    private _permissionCheckService: PermissionCheckService
  ) {
    this.appointmentEditForm = this._formBuilder.group({
      startDate: [data.start, [Validators.required]],
      endDate: [data.end, [Validators.required]],
      description: [data.description, [Validators.required]],
      medicalRecordNumber: [data.medicalRecordNumber, [Validators.required]],
      doctor: [data.doctor, [Validators.required]],
      treatmentPlan: [data.treatmentPlan],
    });

    this._doctorService.getDoctors().subscribe({
      next: (response: any) => {
        this.doctors = response;
      },
    });
    this._treatmentPlanService.getTreatmentPlan(data.patient).subscribe({
      next: (response: any) => {
        this.activeTreatmentPlan = response[0];
      },
    });
  }

  onSubmit() {
    if (this.appointmentEditForm.valid) {
      const formData: any = this.appointmentEditForm.value;
      const payload: IAppointment = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        patient: this.data.patient,
        doctor: formData.doctor,
        treatmentPlan: formData.treatmentPlan,
      };
      this._appointmentService
        .update(this.data.appointmentId, payload)
        .subscribe({
          next: (response) => {
            this._toastrService.success('Cita modificada con éxito');
            this._dialogReference.close({ data: response, deleted: false });
          },
          error: (error) => {
            const errorData = this._authenticationService.snakeToCamel(
              error.error
            );
            if ('error' in errorData)
              this._toastrService.error(errorData.error);
            if (errorData.duration !== '' && 'duration' in errorData)
              this._toastrService.error(errorData.duration);
            if (errorData.outOfBusiness !== '' && 'outOfBusiness' in errorData)
              this._toastrService.error(errorData.outOfBusiness);
            if (errorData.wrapLunchTime !== '' && 'wrapLunchTime' in errorData)
              this._toastrService.error(errorData.wrapLunchTime);
            if (
              errorData.lunchTimeCross !== '' &&
              'lunchTimeCross' in errorData
            )
              this._toastrService.error(errorData.lunchTimeCross);
            if (errorData.sameDay !== '' && 'sameDay' in errorData)
              this._toastrService.error(errorData.sameDay);
          },
        });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }

  onDelete() {
    const deleteDialogReference = this._dialog.open(
      AppointmentDeleteComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: this.data,
      }
    );
    deleteDialogReference.updateSize();
    deleteDialogReference.afterClosed().subscribe({
      next: (response) => {
        this._dialogReference.close(response);
      },
    });
  }

  onViewPayment() {
    const viewPaymentDialogReference = this._dialog.open(PaymentsComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: { appointmentId: this.data.appointmentId },
    });
  }

  checkPermission(permission: string) {
    return this._permissionCheckService.validate(permission);
  }
}
