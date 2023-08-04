import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentPlanService } from '../../services/treatment-plan.service';
import { ProcedureService } from 'src/app/modules/procedures/services/procedure.service';
import { IProcedure } from 'src/app/modules/procedures/interfaces/procedure.interface';
import {
  IProcedureTreatmentPlan,
  ITreatmentPlan,
} from '../../interfaces/treatment-plan.interface';
@Component({
  selector: 'app-treatment-plan-add',
  templateUrl: './treatment-plan-add.component.html',
  styleUrls: ['./treatment-plan-add.component.scss'],
})
export class TreatmentPlanAddComponent {
  patientId!: string | null;
  procedures!: IProcedure[];
  selectedProcedures: IProcedureTreatmentPlan[] = [];
  constructor(
    private _toastrService: ToastrService,
    private _treatmentPlanService: TreatmentPlanService,
    private _procedureService: ProcedureService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.patientId = this._route.snapshot.paramMap.get('id');
    this._procedureService.getProcedures().subscribe({
      next: (response: any) => {
        this.procedures = response;
      },
      error: (error) => {},
    });
  }

  onProcedureSelectionChange(): void {
    this.selectedProcedures.forEach((procedure) => {
      if (!procedure.fees) {
        procedure.fees = 0;
      }
      if (!procedure.numberOfPieces) {
        procedure.numberOfPieces = 0;
      }
    });
  }

  removeProcedure(procedure: IProcedureTreatmentPlan): void {
    this.selectedProcedures = this.selectedProcedures.filter(
      (p) => p !== procedure
    );
  }

  onSubmit() {
    if (this.selectedProcedures.length != 0) {
      let payload: ITreatmentPlan = {
        isActive: true,
        patient: this.patientId ? parseInt(this.patientId) : 0,
        procedures: [],
      };
      payload.procedures = this.selectedProcedures.map((procedure) => {
        return {
          procedure: procedure.id,
          fees: procedure.fees,
          numberOfPieces: procedure.numberOfPieces,
        };
      });
      this._treatmentPlanService.create(payload).subscribe({
        next: (response) => {
          this._toastrService.success('Plan de tratamiento agregado con éxito');
          this._router.navigate([
            `/patients/treatment-plans/${this.patientId}`,
          ]);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
