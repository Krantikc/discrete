import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService } from "angularx-social-login";

import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  @Output() themeChange: any;

  selectedTheme = localStorage.getItem('theme') || 'teal';

  help = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.signOut();
    console.log('Singn Out');
    setTimeout(() => {
      this.navigate('/auth/login');
    }, 300);
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  changeTheme(theme: string): void {
    this.selectedTheme = theme;
    this.sharedService
        .themeChange.next(theme);
  }

}
