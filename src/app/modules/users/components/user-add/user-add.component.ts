import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  FormControl,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/modules/groups/services/group.service';
import { IPerson } from '../../interfaces/user.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const is_submitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || is_submitted)
    );
  }
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  userAddForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  groups = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _userService: UserService,
    private _groupService: GroupService,
    private _router: Router
  ) {
    this.userAddForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      maternalLastName: [''],
      address: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^\\d{4}-\\d{4}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      groups: ['', [Validators.required]],
    });

    this._groupService.getGroups(['Recepcionista']).subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (error) => {},
    });
  }

  onSubmit() {
    if (this.userAddForm.valid) {
      const formData: any = this.userAddForm.value;
      const payload: IPerson = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        maternalLastName: formData.maternalLastName,
        address: formData.address,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        user: {
          email: formData.email,
          groups: [formData.groups] || [],
        },
      };
      this._userService.create(payload).subscribe({
        next: (response) => {
          this._toastrService.success('Usuario agregado con éxito');
          this._router.navigate(['/users']);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
