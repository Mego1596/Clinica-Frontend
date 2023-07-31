import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DEFAULT_PAGE_SIZE } from 'src/app/constants/constants';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { DoctorService } from '../../services/doctor.service';
import { DoctorViewComponent } from '../doctor-view/doctor-view.component';
import { DoctorDeleteComponent } from '../doctor-delete/doctor-delete.component';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'medicalLicenseNumber',
    'email',
    'gender',
    'username',
    'status',
    'actions',
  ];
  currentPage: number = 0;
  totalPages: number = 0;
  dataList!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _doctorService: DoctorService,
    private _permissionCheck: PermissionCheckService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._doctorService.list().subscribe({
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
      const doctor = results[row];
      data[index++] = {
        id: doctor.id,
        medicalLicenseNumber: doctor.medicalLicenseNumber,
        firstName: doctor.person.firstName,
        lastName: doctor.person.lastName,
        email: doctor.person.user.email,
        username: doctor.person.user.username,
        isActive: doctor.person.user.isActive,
        gender: doctor.person.gender,
        row: results[row],
      };
    }

    return data;
  }

  loadPage(pageNumber: number) {
    this._doctorService.list(pageNumber).subscribe({
      next: (response) => {
        this.currentPage = pageNumber;
        const tableData = this.tableDataBuilder(response.results);
        this.dataList = new MatTableDataSource(tableData);
        this.dataList.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  onView(doctor: any) {
    const viewDialogReference = this._dialog.open(DoctorViewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: doctor.row,
    });
    viewDialogReference.updateSize();
  }

  onDelete(doctor: any) {
    const deleteDialogReference = this._dialog.open(DoctorDeleteComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: doctor,
    });
    deleteDialogReference.updateSize();
    deleteDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  checkPermission(permission: string) {
    return this._permissionCheck.validate(permission);
  }
}
