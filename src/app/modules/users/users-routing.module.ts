import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './users.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { verifyPermissionGuard } from 'src/app/guards/permission/verify-permission.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--viewperson' },
      },
      {
        path: 'add',
        component: UserAddComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--addperson' },
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        canActivate: [verifyPermissionGuard],
        data: { permission: '--changeperson' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
