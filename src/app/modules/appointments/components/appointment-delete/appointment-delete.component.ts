import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment.service';
@Component({
  selector: 'app-appointment-delete',
  templateUrl: './appointment-delete.component.html',
  styleUrls: ['./appointment-delete.component.scss'],
})
export class AppointmentDeleteComponent {
  constructor(
    private _appointmentService: AppointmentService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<AppointmentDeleteComponent>
  ) {}

  onDelete() {
    this._appointmentService.delete(this.data.appointmentId).subscribe({
      next: (response) => {
        this._toastrService.success('Cita eliminada con éxito');
        this._dialogReference.close({ data: response, deleted: true });
      },
    });
  }
}
