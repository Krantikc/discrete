import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherModule } from 'weather';
import { NgVoiceInputsModule } from "ng-voice-inputs";

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    WeatherModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    TokenStorage
  ]
})
export class AuthModule { }
