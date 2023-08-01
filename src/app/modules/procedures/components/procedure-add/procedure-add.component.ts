import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProcedure } from '../../interfaces/procedure.interface';
import { ProcedureService } from '../../services/procedure.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-procedure-add',
  templateUrl: './procedure-add.component.html',
  styleUrls: ['./procedure-add.component.scss'],
})
export class ProcedureAddComponent {
  name: string = '';
  description: string = '';
  constructor(
    private _toastrService: ToastrService,
    private _procedureService: ProcedureService,
    private _dialogReference: MatDialogRef<ProcedureAddComponent>
  ) {}

  onSubmit() {
    if (this.name === '') {
      this._toastrService.warning('Porfavor ingrese información válida');
      return;
    }
    const procedure: IProcedure = {
      name: this.name,
      description: this.description,
    };

    this._procedureService.create(procedure).subscribe({
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
