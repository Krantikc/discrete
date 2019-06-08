import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth-guard.service';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private authGuard: AuthGuard) { }

  email: string;
  password: string;
  errorMsg: string;
  processing: boolean;

  ngOnInit() {
    if (this.authGuard.canActivate()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    this.errorMsg = null;
    this.processing = true;
    let loginSubscription: Observable<any>;
    loginSubscription = this.authService.login(this.email, this.password);

    loginSubscription.subscribe(
      (data: any) => {
        if (data instanceof HttpErrorResponse) {
          this.errorMsg = 'Invalid email or password';
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.processing = false;
      },
      (error: any) => {
        this.errorMsg = error;
      },
      () => {
        this.processing = false;
      }
    );
  }
}
