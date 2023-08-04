import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentPlanService } from '../../services/treatment-plan.service';
import { ProcedureService } from 'src/app/modules/procedures/services/procedure.service';
import { IProcedure } from 'src/app/modules/procedures/interfaces/procedure.interface';
import {
  ITreatmentPlan,
  IProcedureTreatmentPlan,
  IProcedureTreatment,
} from '../../interfaces/treatment-plan.interface';

@Component({
  selector: 'app-treatment-plan-edit',
  templateUrl: './treatment-plan-edit.component.html',
  styleUrls: ['./treatment-plan-edit.component.scss'],
})
export class TreatmentPlanEditComponent {
  patientId!: string | null;
  treatmentPlanId!: string | null;
  procedures!: IProcedure[];
  selectedProcedures: IProcedureTreatmentPlan[] = [];
  preSelectionBackup: IProcedureTreatmentPlan[] = [];
  constructor(
    private _toastrService: ToastrService,
    private _treatmentPlanService: TreatmentPlanService,
    private _procedureService: ProcedureService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.patientId = this._route.snapshot.paramMap.get('id');
    this.treatmentPlanId = this._route.snapshot.paramMap.get('treatmentPlanId');
    if (this.treatmentPlanId) {
      this._treatmentPlanService.get(parseInt(this.treatmentPlanId)).subscribe({
        next: (response: any) => {
          const resultProcedures: IProcedureTreatment[] = response.procedures;
          this.selectedProcedures = resultProcedures.map(
            (procedure: IProcedureTreatment) => {
              return {
                id: procedure.procedure,
                fees: procedure.fees,
                numberOfPieces: procedure.numberOfPieces,
              };
            }
          );
          this.preSelectionBackup = this.selectedProcedures;
        },
      });
      this._procedureService.getProcedures().subscribe({
        next: (response: any) => {
          this.procedures = response;
          this.selectedProcedures = this.selectedProcedures.map(
            (selectedProcedure: IProcedureTreatmentPlan) => {
              const currentProcedure = this.procedures.filter(
                (procedure: IProcedure) => procedure.id == selectedProcedure.id
              );
              return {
                ...selectedProcedure,
                name: currentProcedure[0].name,
                description: currentProcedure[0].description,
              };
            }
          );
        },
        error: (error) => {},
      });
    }
  }

  compareProcedureById(procedure1: IProcedure, procedure2: IProcedure) {
    return procedure1 && procedure2
      ? procedure1.id === procedure2.id
      : procedure1 === procedure2;
  }

  onProcedureSelectionChange(): void {
    this.selectedProcedures.forEach((procedure) => {
      const preSelectedProcedure = this.preSelectionBackup.find(
        (selectedProcedure) => selectedProcedure.id === procedure.id
      );
      if (preSelectedProcedure) {
        if (!procedure.fees) {
          procedure.fees = preSelectedProcedure.fees;
        }
        if (!procedure.numberOfPieces) {
          procedure.numberOfPieces = preSelectedProcedure.numberOfPieces;
        }
      }

      if (!procedure.fees) {
        procedure.fees = 0;
      }
      if (!procedure.numberOfPieces) {
        procedure.numberOfPieces = 0;
      }
    });
  }

  addNewFeeValueToBackup(
    newValue: number,
    procedureId: number | undefined
  ): void {
    this.preSelectionBackup.forEach((selectedProcedure) => {
      if (procedureId == selectedProcedure.id) {
        selectedProcedure.fees = newValue;
      }
    });
  }

  addNewNumberOfPiecesValueToBackup(
    newValue: number,
    procedureId: number | undefined
  ): void {
    this.preSelectionBackup.forEach((selectedProcedure) => {
      if (procedureId == selectedProcedure.id) {
        selectedProcedure.numberOfPieces = newValue;
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
      if (this.treatmentPlanId) {
        this._treatmentPlanService
          .update(parseInt(this.treatmentPlanId), payload)
          .subscribe({
            next: (response) => {
              this._toastrService.success(
                'Plan de tratamiento modificado con éxito'
              );
              this._router.navigate([
                `/patients/treatment-plans/${this.patientId}`,
              ]);
            },
            error: (error) => {},
          });
      }
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
