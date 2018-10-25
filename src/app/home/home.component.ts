import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gitUsers = [];
  highlighted: Subject<any> = new Subject<any>();
  page = 1;
  pageSize = 100;
  timerInst = null;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadGITUsers();
    this.highlighted.subscribe((page: any) => {
      this.loadGITUsers();
    });
  }

  loadGITUsers() {
    clearInterval(this.timerInst);
    this.dashboardService.getGITUsers(this.page, this.pageSize)
        .subscribe((users: any) => {
          this.gitUsers = users;
          this.highlightRandom();
        });
  }

  highlightRandom() {
    const highlightedUsers = [];
    this.timerInst = setInterval(() => {
      const index = Math.floor(Math.random() * 100);
      if (!highlightedUsers.includes(index)) {
        highlightedUsers.push(index);
        this.gitUsers[index].style = {opacity: 1};
      }
      if (highlightedUsers.length > 50) {
        this.page++;
        if (this.page < 10) {
          this.highlighted.next(this.page);
        }
      }
    }, 300);
  }

}
