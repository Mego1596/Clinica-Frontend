import { Component, Inject } from '@angular/core';
import { MedicalPrescriptionService } from '../../services/medical-prescription.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medical-prescription-delete',
  templateUrl: './medical-prescription-delete.component.html',
  styleUrls: ['./medical-prescription-delete.component.scss'],
})
export class MedicalPrescriptionDeleteComponent {
  constructor(
    private _medicalPrescriptionService: MedicalPrescriptionService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<MedicalPrescriptionDeleteComponent>
  ) {}

  onDelete() {
    this._medicalPrescriptionService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Receta Médica eliminada con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
