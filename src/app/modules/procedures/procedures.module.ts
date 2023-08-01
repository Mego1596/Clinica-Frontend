import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresComponent } from './procedures.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProcedureListComponent } from './components/procedure-list/procedure-list.component';
import { ProcedureAddComponent } from './components/procedure-add/procedure-add.component';
import { ProcedureEditComponent } from './components/procedure-edit/procedure-edit.component';
import { ProcedureViewComponent } from './components/procedure-view/procedure-view.component';
import { ProcedureDeleteComponent } from './components/procedure-delete/procedure-delete.component';

const components = [ProceduresComponent];
const modules = [
  CommonModule,
  ProceduresRoutingModule,
  SharedModule,
  FormsModule,
];

@NgModule({
  declarations: [...components, ProcedureListComponent, ProcedureAddComponent, ProcedureEditComponent, ProcedureViewComponent, ProcedureDeleteComponent],
  imports: [...modules],
})
export class ProceduresModule {}
