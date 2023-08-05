import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';
import { PaymentService } from './services/payment.service';
import { PaymentsAddComponent } from './components/payments-add/payments-add.component';
import { IPayment } from './interfaces/payment.interface';
import { PaymentsDeleteComponent } from './components/payments-delete/payments-delete.component';
import { PaymentsEditComponent } from './components/payments-edit/payments-edit.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['description', 'income', 'actions'];
  dataList!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _paymentService: PaymentService,
    private _permissionCheckService: PermissionCheckService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._paymentService.getPayments(this.data.appointmentId).subscribe({
      next: (response: any) => {
        const tableData = this.tableDataBuilder(response);
        this.dataList = new MatTableDataSource(tableData);
        this.dataList.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  tableDataBuilder(results: any) {
    let data: Array<object> = [];
    let index = 0;
    for (let row in results) {
      const payment = results[row];
      data[index++] = {
        id: payment.id,
        description: payment.description,
        income: payment.income,
        row: results[row],
      };
    }

    return data;
  }

  onCreate() {
    const addDialogReference = this._dialog.open(PaymentsAddComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: { appointmentId: this.data.appointmentId },
    });

    addDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onUpdate(payment: IPayment) {
    const updateDialogReference = this._dialog.open(PaymentsEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: payment,
    });

    updateDialogReference.afterClosed().subscribe({
      next: (formSaved: Boolean) => {
        if (formSaved) {
          this.loadData();
        }
      },
    });
  }

  onDelete(payment: IPayment) {
    const deleteDialogReference = this._dialog.open(PaymentsDeleteComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: payment,
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
    return this._permissionCheckService.validate(permission);
  }
}
