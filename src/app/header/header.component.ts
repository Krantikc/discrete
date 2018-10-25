import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/auth/login');
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
