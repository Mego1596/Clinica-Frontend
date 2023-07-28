import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';

const components = [
  UsersComponent,
  UserListComponent,
  UserAddComponent,
  UserEditComponent,
  UserViewComponent,
  UserDeleteComponent,
];
const modules = [
  CommonModule,
  UsersRoutingModule,
  SharedModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class UsersModule {}
