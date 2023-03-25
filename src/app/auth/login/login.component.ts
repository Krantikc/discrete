import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth-guard.service';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { TokenStorage } from '../token.storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private authGuard: AuthGuard, private socialAuthService: SocialAuthService,
              private authToken: TokenStorage) { }

  email: string;
  password: string;
  errorMsg: string;
  processing: boolean;

  ngOnInit() {
    
    if (this.authGuard.canActivate()) {
      this.router.navigate(['/dashboard']);
    }

    this.socialAuthService.authState.subscribe((user: any) => {
      if (user) {
        console.log(user);
        let newUser = {
          email: user.email,
          fullname: user.name,
          roles: []
        }
        this.authService.setUser(newUser);
        this.authToken.saveToken(user.idToken);
        this.router.navigate(['/dashboard']);
      }
    });
   
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
