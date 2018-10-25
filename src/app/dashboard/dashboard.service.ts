import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getGITUsers(page?: number, pageSize?: number) {
    page = page || 1;
    pageSize = pageSize || 100;
    const url = `${environment.endPoint}github/users?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  getGITUserRepos(user: any) {
    const url = `${environment.endPoint}github/users/${user.login}/repos`;
    return this.http.get(url);
  }
}
