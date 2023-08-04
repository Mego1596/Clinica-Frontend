import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DEFAULT_PAGE_SIZE } from 'src/app/constants/constants';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { TreatmentPlanService } from '../../services/treatment-plan.service';
import { ActivatedRoute } from '@angular/router';
import {
  IProcedureTreatment,
  ITreatmentPlan,
} from '../../interfaces/treatment-plan.interface';
import { TreatmentPlanDeleteComponent } from '../treatment-plan-delete/treatment-plan-delete.component';
import { TreatmentPlanViewComponent } from '../treatment-plan-view/treatment-plan-view.component';

@Component({
  selector: 'app-treatment-plan-list',
  templateUrl: './treatment-plan-list.component.html',
  styleUrls: ['./treatment-plan-list.component.scss'],
})
export class TreatmentPlanListComponent implements OnInit {
  patientId!: string | null;
  displayedColumns: string[] = ['isActive', 'actions'];
  currentPage: number = 0;
  totalPages: number = 0;
  dataList!: MatTableDataSource<any>;
  showTreatmentPlanAddBtn: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _treatmentPlanService: TreatmentPlanService,
    private _permissionCheckService: PermissionCheckService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientId = this._route.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadData() {
    if (this.patientId) {
      this._treatmentPlanService.getTreatmentPlans(this.patientId).subscribe({
        next: (response: any) => {
          const tableData = this.tableDataBuilder(response.results);
          this.currentPage = response.count == 0 ? 0 : 1;
          this.totalPages = Math.ceil(response.count / DEFAULT_PAGE_SIZE);
          this.dataList = new MatTableDataSource(tableData);
          this.dataList.sort = this.sort;
        },
        error: (error) => {
          this.currentPage = 0;
        },
      });
    }
  }

  tableDataBuilder(results: any) {
    let data: Array<object> = [];
    let index = 0;
    for (let row in results) {
      const treatmentPlan = results[row];
      if (treatmentPlan.isActive) {
        if (this.showTreatmentPlanAddBtn) this.showTreatmentPlanAddBtn = false;
      }
      data[index++] = {
        id: treatmentPlan.id,
        isActive: treatmentPlan.isActive,
        row: results[row],
      };
    }

    return data;
  }

  loadPage(pageNumber: number) {
    if (this.patientId) {
      this._treatmentPlanService
        .getTreatmentPlans(this.patientId, pageNumber)
        .subscribe({
          next: (response: any) => {
            this.currentPage = pageNumber;
            const tableData = this.tableDataBuilder(response.results);
            this.dataList = new MatTableDataSource(tableData);
            this.dataList.sort = this.sort;
          },
          error: (error) => {},
        });
    }
  }

  onView(procedures: IProcedureTreatment) {
    const viewDialogReference = this._dialog.open(TreatmentPlanViewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: procedures,
    });
    viewDialogReference.updateSize();
  }

  onDelete(treatmentPlan: ITreatmentPlan) {
    const deleteDialogReference = this._dialog.open(
      TreatmentPlanDeleteComponent,
      {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '100%',
        data: treatmentPlan,
      }
    );
    deleteDialogReference.updateSize();
    deleteDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.showTreatmentPlanAddBtn = true;
          this.loadData();
        }
      },
    });
  }

  checkPermission(permission: string) {
    return this._permissionCheckService.validate(permission);
  }
}
