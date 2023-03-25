import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from "./app.component";
import { AdminModule } from "./admin/admin.module";
import { AuthHeaderInterceptor } from "./interceptors/header.interceptor";
import { CatchErrorInterceptor } from "./interceptors/http-error.interceptor";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserComponent } from "./user/user.component";
import { ReposComponent } from "./dashboard/repos/repos.component";
import { HomeComponent } from "./home/home.component";
import { SpeechInterpreterComponent } from "./components/speech-interpreter/speech-interpreter.component";

import {
  SocialLoginModule,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from "angularx-social-login";
// import { WeatherModule } from 'weather';
import { NgVoiceInputsComponent, NgVoiceInputsModule } from "ng-voice-inputs";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    UserComponent,
    ReposComponent,
    HomeComponent,
    SpeechInterpreterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    SocialLoginModule,
    // WeatherModule,
    NgVoiceInputsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    [
      {
        provide: "SocialAuthServiceConfig",
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider("clientId"),
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider("clientId"),
            },
          ],
          onError: (err) => {
            console.error(err);
          },
        } as SocialAuthServiceConfig,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
