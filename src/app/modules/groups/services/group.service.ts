import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/api/routes';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private _http: HttpClient) {}

  getGroups(
    includeGroups?: Array<string>,
    excludeGroups?: Array<string>
  ): Observable<any> {
    return this._http.get(ROUTES.group.getGroups(includeGroups, excludeGroups));
  }
}
