import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent {
  age: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(data.birthDate).getFullYear();
    this.age = currentYear - birthYear;
  }
}
