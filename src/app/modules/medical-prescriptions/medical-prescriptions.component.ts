import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { MedicalPrescriptionAddComponent } from './components/medical-presciption-add/medical-prescription-add.component';
import { MedicalPrescriptionService } from './services/medical-prescription.service';
import { IMedicalPrescription } from './interfaces/medical-prescription.interface';
import { MedicalPrescriptionEditComponent } from './components/medical-prescription-edit/medical-prescription-edit.component';
import { MedicalPrescriptionDeleteComponent } from './components/medical-prescription-delete/medical-prescription-delete.component';
import { PrescriptionDetailsAddComponent } from '../prescription-details/components/prescription-details-add/prescription-details-add.component';
import { PrescriptionDetailService } from '../prescription-details/services/prescription-detail.service';
import { IPrescriptionDetail } from '../prescription-details/interfaces/prescription-detail.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PrescriptionDetailsEditComponent } from '../prescription-details/components/prescription-details-edit/prescription-details-edit.component';
import { PrescriptionDetailsDeleteComponent } from '../prescription-details/components/prescription-details-delete/prescription-details-delete.component';

@Component({
  selector: 'app-medical-prescriptions',
  templateUrl: './medical-prescriptions.component.html',
  styleUrls: ['./medical-prescriptions.component.scss'],
})
export class MedicalPrescriptionsComponent {
  showAddDetailsBtn: boolean = false;
  medicalPrescription!: IMedicalPrescription | null;
  displayedColumns: string[] = ['medication', 'dose', 'quantity', 'actions'];
  dataList!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _medicalPrescriptionService: MedicalPrescriptionService,
    private _prescriptionDetailService: PrescriptionDetailService,
    private _permissionCheckService: PermissionCheckService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadData();
  }

  loadData() {
    this._medicalPrescriptionService
      .getMedicalPrescriptions(this.data.appointmentId)
      .subscribe({
        next: (response: any) => {
          if (response.length != 0) {
            this.showAddDetailsBtn = true;
            this.medicalPrescription = response[0];
            this.loadPrescriptionDetails(this.medicalPrescription?.id);
          } else {
            this.showAddDetailsBtn = false;
            this.medicalPrescription = null;
          }
        },
        error: (error) => {},
      });
  }

  onCreate() {
    const addDialogReference = this._dialog.open(
      MedicalPrescriptionAddComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: { appointmentId: this.data.appointmentId },
      }
    );
    addDialogReference.updateSize();
    addDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onUpdate() {
    const editDialogReference = this._dialog.open(
      MedicalPrescriptionEditComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: this.medicalPrescription,
      }
    );
    editDialogReference.updateSize();
    editDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onDelete() {
    const deleteDialogReference = this._dialog.open(
      MedicalPrescriptionDeleteComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: this.medicalPrescription,
      }
    );
    deleteDialogReference.updateSize();
    deleteDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onCreatePrescriptionDetail() {
    const addPrescriptionDetailDialogReference = this._dialog.open(
      PrescriptionDetailsAddComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: this.medicalPrescription,
      }
    );

    addPrescriptionDetailDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadPrescriptionDetails(this.medicalPrescription?.id);
        }
      },
    });
  }

  loadPrescriptionDetails(medicalPrescriptionId: number | undefined) {
    if (medicalPrescriptionId) {
      this._prescriptionDetailService
        .getPrescriptionDetails(medicalPrescriptionId)
        .subscribe({
          next: (response: any) => {
            const tableData = this.tableDataBuilder(response);
            this.dataList = new MatTableDataSource(tableData);
            this.dataList.sort = this.sort;
          },
          error: (error) => {},
        });
    }
  }

  tableDataBuilder(results: any) {
    let data: Array<object> = [];
    let index = 0;
    for (let row in results) {
      const prescriptionDetail = results[row];
      data[index++] = {
        id: prescriptionDetail.id,
        medication: prescriptionDetail.medication,
        dose: prescriptionDetail.dose,
        quantity: prescriptionDetail.quantity,
        row: results[row],
      };
    }

    return data;
  }

  onUpdatePrescriptionDetail(prescriptionDetail: IPrescriptionDetail) {
    const editPrescriptionDetailDialogReference = this._dialog.open(
      PrescriptionDetailsEditComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: prescriptionDetail,
      }
    );
    editPrescriptionDetailDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadPrescriptionDetails(this.medicalPrescription?.id);
        }
      },
    });
  }

  onDeletePrescriptionDetail(prescriptionDetail: IPrescriptionDetail) {
    const deletePrescriptionDetailDialogReference = this._dialog.open(
      PrescriptionDetailsDeleteComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: prescriptionDetail,
      }
    );
    deletePrescriptionDetailDialogReference.updateSize();
    deletePrescriptionDetailDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadPrescriptionDetails(this.medicalPrescription?.id);
        }
      },
    });
  }

  checkPermission(permission: string) {
    return this._permissionCheckService.validate(permission);
  }
}
