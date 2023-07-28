import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { DEFAULT_PAGE_SIZE } from 'src/app/constants/constants';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'email',
    'gender',
    'phone',
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
    private _userService: UserService,
    private _permissionCheck: PermissionCheckService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._userService.list().subscribe({
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
      const person = results[row];
      data[index++] = {
        id: person.id,
        fullName: `${person.firstName} ${person.middleName} ${person.lastName} ${person.maternalLastName}`,
        email: person.user.email,
        phoneNumber: person.phoneNumber,
        username: person.user.username,
        isActive: person.user.isActive,
        gender: person.gender,
        row: results[row],
      };
    }

    return data;
  }

  loadPage(pageNumber: number) {
    this._userService.list(pageNumber).subscribe({
      next: (response) => {
        this.currentPage = pageNumber;
        const tableData = this.tableDataBuilder(response.results);
        this.dataList = new MatTableDataSource(tableData);
        this.dataList.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  onView(person: any) {
    const viewDialogReference = this._dialog.open(UserViewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: person.row,
    });
    viewDialogReference.updateSize();
  }

  onDelete(person: any) {
    const deleteDialogReference = this._dialog.open(UserDeleteComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: person,
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
