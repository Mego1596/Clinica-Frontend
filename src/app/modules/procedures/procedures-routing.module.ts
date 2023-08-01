import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProceduresComponent } from './procedures.component';
import { ProcedureListComponent } from './components/procedure-list/procedure-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProceduresComponent,
    children: [{ path: '', component: ProcedureListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceduresRoutingModule {}
