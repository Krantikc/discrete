import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  repos: any[] = [];

  constructor(public dialogRef: MatDialogRef<ReposComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient) { }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    const repoUrl = this.data.user.repos_url;
    this.repos = [];
    this.http.get(repoUrl).subscribe((repos: any) => {
      this.repos = repos;
    });
  }

}
