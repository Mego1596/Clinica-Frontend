import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcedureService } from '../../services/procedure.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-procedure-delete',
  templateUrl: './procedure-delete.component.html',
  styleUrls: ['./procedure-delete.component.scss'],
})
export class ProcedureDeleteComponent {
  constructor(
    private _procedureService: ProcedureService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<ProcedureDeleteComponent>
  ) {}

  onDelete() {
    this._procedureService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Procedimiento eliminado con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
