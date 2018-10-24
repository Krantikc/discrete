import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {

    return next
      .handle(request)
      .do
        ((event: HttpEvent < any >) => {}, (err: any) => {
          if (err instanceof HttpErrorResponse && !err.url.includes('/auth/login')) {
            let text = (err.error && err.error.message) ? err.error.message : err.statusText;
           // (<any>window).globalEvents.emit('open error dialog', text);
            this.router.navigate(['/auth/login']);
          }
        });
      }
  }
