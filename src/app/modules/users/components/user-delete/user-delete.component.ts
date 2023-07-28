import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent {
  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogReference: MatDialogRef<UserDeleteComponent>
  ) {}

  onDelete() {
    this._userService.delete(this.data.id).subscribe({
      next: (response) => {
        this._toastrService.success('Usuario eliminado con éxito');
        this._dialogReference.close(true);
      },
    });
  }
}
