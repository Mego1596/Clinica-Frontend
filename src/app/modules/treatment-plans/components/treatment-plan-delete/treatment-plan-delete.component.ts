import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TreatmentPlanService } from '../../services/treatment-plan.service';

@Component({
  selector: 'app-treatment-plan-delete',
  templateUrl: './treatment-plan-delete.component.html',
  styleUrls: ['./treatment-plan-delete.component.scss'],
})
export class TreatmentPlanDeleteComponent {
  constructor(
    private _treatmentPlanService: TreatmentPlanService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<TreatmentPlanDeleteComponent>
  ) {}

  onDelete() {
    this._treatmentPlanService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Plan de Tratamiento finalizado con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
