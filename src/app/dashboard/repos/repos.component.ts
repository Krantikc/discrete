import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  repos: any[] = [];

  constructor(public dialogRef: MatDialogRef<ReposComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dashboardService: DashboardService) { }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.repos = [];
    this.dashboardService.getGITUserRepos(this.data.user).subscribe((repos: any) => {
      this.repos = repos;
    });
  }

}
