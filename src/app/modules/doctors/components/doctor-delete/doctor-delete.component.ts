import { Component, Inject } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-delete',
  templateUrl: './doctor-delete.component.html',
  styleUrls: ['./doctor-delete.component.scss'],
})
export class DoctorDeleteComponent {
  constructor(
    private _doctorService: DoctorService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<DoctorDeleteComponent>
  ) {}

  onDelete() {
    this._doctorService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Usuario eliminado con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
