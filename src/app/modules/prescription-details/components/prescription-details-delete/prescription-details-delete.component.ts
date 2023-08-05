import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PrescriptionDetailService } from '../../services/prescription-detail.service';

@Component({
  selector: 'app-prescription-details-delete',
  templateUrl: './prescription-details-delete.component.html',
  styleUrls: ['./prescription-details-delete.component.scss'],
})
export class PrescriptionDetailsDeleteComponent {
  constructor(
    private _prescriptionDetailService: PrescriptionDetailService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<PrescriptionDetailsDeleteComponent>
  ) {}

  onDelete() {
    this._prescriptionDetailService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Detalle eliminado con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
