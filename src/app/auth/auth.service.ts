import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SocialAuthService } from "angularx-social-login";

import { TokenStorage } from './token.storage';
import { TooltipComponent } from '@angular/material/tooltip';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage, 
              private socialAuthService: SocialAuthService) {}

  public $userSource = new Subject<any>();

  login(email: string, password: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post(environment.endPoint + 'auth/login', {
        email,
        password
      }).subscribe((data: any) => {
          observer.next({user: data.user});
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
      }, (error: any) => {
        if (error.status === 401) {
          return observer.next(error);
        }
      });
    });
  }

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post(environment.endPoint + 'auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      });
    });
  }

  setUser(user): void {
    if (user) {
      user.isAdmin = (user.roles.indexOf('admin') > -1);
    }
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) {
        return  observer.complete();
      }
      this.http.get(environment.endPoint + 'auth/me').subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

  async signOut() {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
    this.socialAuthService.authState.subscribe((user: any) => {
      if (user) {
        this.socialAuthService.signOut();
      }
    });
    return true;
  }
}
