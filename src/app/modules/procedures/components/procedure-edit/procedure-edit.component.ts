import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProcedure } from '../../interfaces/procedure.interface';
import { ToastrService } from 'ngx-toastr';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'app-procedure-edit',
  templateUrl: './procedure-edit.component.html',
  styleUrls: ['./procedure-edit.component.scss'],
})
export class ProcedureEditComponent {
  procedureId: number;
  name: string;
  description: string;
  constructor(
    private _toastrService: ToastrService,
    private _procedureService: ProcedureService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<ProcedureEditComponent>
  ) {
    this.procedureId = data.id;
    this.name = data.name;
    this.description = data.description;
  }

  onSubmit() {
    if (this.name === '') {
      this._toastrService.warning('Porfavor ingrese información válida');
      return;
    }
    const procedure: IProcedure = {
      name: this.name,
      description: this.description,
    };

    this._procedureService.update(this.procedureId, procedure).subscribe({
      next: (response) => {
        this._toastrService.success('Procedimiento agregado con éxito');
        this._dialogReference.close(true);
      },
      error: (error) => {
        this._toastrService.warning('Porfavor ingrese información válida');
      },
    });
  }
}
