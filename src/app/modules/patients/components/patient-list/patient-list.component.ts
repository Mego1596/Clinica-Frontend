import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DEFAULT_PAGE_SIZE } from 'src/app/constants/constants';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { PatientService } from '../../services/patient.service';
import { PatientViewComponent } from '../patient-view/patient-view.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = [
    'medicalRecordNumber',
    'firstName',
    'lastName',
    'email',
    'gender',
    'actions',
  ];
  currentPage: number = 0;
  totalPages: number = 0;
  dataList!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _patientService: PatientService,
    private _permissionCheck: PermissionCheckService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._patientService.list().subscribe({
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

  tableDataBuilder(results: any) {
    let data: Array<object> = [];
    let index = 0;
    for (let row in results) {
      const patient = results[row];
      data[index++] = {
        id: patient.id,
        medicalRecordNumber: patient.medicalRecord.medicalRecordNumber,
        firstName: patient.person.firstName,
        lastName: patient.person.lastName,
        email: patient.person.user.email,
        gender: patient.person.gender,
        row: results[row],
      };
    }

    return data;
  }

  loadPage(pageNumber: number) {
    this._patientService.list(pageNumber).subscribe({
      next: (response) => {
        this.currentPage = pageNumber;
        const tableData = this.tableDataBuilder(response.results);
        this.dataList = new MatTableDataSource(tableData);
        this.dataList.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  onView(patient: any) {
    const viewDialogReference = this._dialog.open(PatientViewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: patient.row,
    });
    viewDialogReference.updateSize();
  }

  checkPermission(permission: string) {
    return this._permissionCheck.validate(permission);
  }
}
