import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProcedureTreatment } from '../../interfaces/treatment-plan.interface';
import { ProcedureService } from 'src/app/modules/procedures/services/procedure.service';

@Component({
  selector: 'app-treatment-plan-view',
  templateUrl: './treatment-plan-view.component.html',
  styleUrls: ['./treatment-plan-view.component.scss'],
})
export class TreatmentPlanViewComponent {
  totalFees: number = 0;
  constructor(
    private _procedureService: ProcedureService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data.forEach((item: any) => {
      this.totalFees += parseFloat(item.fees);
      this._procedureService.get(item.procedure).subscribe({
        next: (response: any) => {
          item.procedure = response;
        },
      });
    });
  }
}
