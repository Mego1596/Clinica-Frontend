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
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  userEditForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  groups = [];
  userId: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _userService: UserService,
    private _groupService: GroupService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.userEditForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      maternalLastName: [''],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^\\d{4}-\\d{4}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      groups: ['', [Validators.required]],
    });
    this.loadUserData();
    this._groupService.getGroups().subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (error) => {},
    });
  }

  loadUserData() {
    this._route.params.subscribe({
      next: (params) => {
        this.userId = params['id'];
        if (this.userId) {
          this._userService.get(this.userId).subscribe({
            next: (response: any) => {
              const person = response;
              const userData = {
                firstName: person.firstName,
                middleName: person.middleName,
                lastName: person.lastName,
                maternalLastName: person.maternalLastName,
                address: person.address,
                gender: person.gender,
                phoneNumber: person.phoneNumber,
                email: person.user.email,
                groups: person.user.groups.pop(),
              };
              this.userEditForm.patchValue(userData);
            },
          });
        }
      },
    });
  }

  onSubmit() {
    if (this.userEditForm.valid) {
      const formData: any = this.userEditForm.value;
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

      this._userService.update(this.userId, payload).subscribe({
        next: (response) => {
          this._toastrService.success('Usuario modificado con éxito');
          this._router.navigate(['/users']);
        },
        error: (error) => {},
      });
    } else {
      this._toastrService.warning('Porfavor ingrese información válida');
    }
  }
}
