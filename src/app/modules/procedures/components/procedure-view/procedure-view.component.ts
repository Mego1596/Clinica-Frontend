import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-procedure-view',
  templateUrl: './procedure-view.component.html',
  styleUrls: ['./procedure-view.component.scss'],
})
export class ProcedureViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
