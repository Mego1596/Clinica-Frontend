import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DEFAULT_PAGE_SIZE } from 'src/app/constants/constants';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { ProcedureService } from '../../services/procedure.service';
import { ProcedureAddComponent } from '../procedure-add/procedure-add.component';
import { IProcedure } from '../../interfaces/procedure.interface';
import { ProcedureEditComponent } from '../procedure-edit/procedure-edit.component';
import { ProcedureViewComponent } from '../procedure-view/procedure-view.component';
import { ProcedureDeleteComponent } from '../procedure-delete/procedure-delete.component';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.scss'],
})
export class ProcedureListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  currentPage: number = 0;
  totalPages: number = 0;
  dataList!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _procedureService: ProcedureService,
    private _permissionCheck: PermissionCheckService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._procedureService.list().subscribe({
      next: (response: any) => {
        this.currentPage = response.count == 0 ? 0 : 1;
        this.totalPages = Math.ceil(response.count / DEFAULT_PAGE_SIZE);
        this.dataList = new MatTableDataSource(response.results);
        this.dataList.sort = this.sort;
      },
      error: (error) => {
        this.currentPage = 0;
      },
    });
  }

  loadPage(pageNumber: number) {
    this._procedureService.list(pageNumber).subscribe({
      next: (response) => {
        this.currentPage = pageNumber;
        this.dataList = new MatTableDataSource(response.results);
        this.dataList.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  onAdd() {
    const addDialogReference = this._dialog.open(ProcedureAddComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
    });

    addDialogReference.updateSize();
    addDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onUpdate(procedure: IProcedure) {
    const editDialogReference = this._dialog.open(ProcedureEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: procedure,
    });

    editDialogReference.updateSize();
    editDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onView(procedure: IProcedure) {
    const viewDialogReference = this._dialog.open(ProcedureViewComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: procedure,
    });
    viewDialogReference.updateSize();
  }

  onDelete(procedure: IProcedure) {
    const deleteDialogReference = this._dialog.open(ProcedureDeleteComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: procedure,
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
