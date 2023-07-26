import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements DoCheck {
  isMenuRequired: boolean = false;
  colorBackground: boolean = false;
  constructor(
    private _router: Router,
    private _permissionCheckService: PermissionCheckService
  ) {}
  ngDoCheck(): void {
    let currentUrl = this._router.url;
    if (currentUrl == '/login') {
      this.isMenuRequired = false;
      this.colorBackground = true;
    } else {
      this.isMenuRequired = true;
      this.colorBackground = false;
    }
  }

  checkPermission(permission: string) {
    return this._permissionCheckService.validate(permission);
  }
}
