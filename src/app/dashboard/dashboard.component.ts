import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ReposComponent } from './repos/repos.component';
import { SpeechInterpreterService } from "@app/components/speech-interpreter/speech-interpreter.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gitUsers: any[] = [];
  constructor(private dashboardService: DashboardService,
              public dialog: MatDialog,
              private speechInterpreterService: SpeechInterpreterService) {}

  showRepos(user: any): void {
    const dialogRef = this.dialog.open(ReposComponent, {
      width: '450px',
      data: {user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  speechRecognition() {
    this.speechInterpreterService.interpretSpeech('');
  }

  ngOnInit() {
    this.dashboardService.getGITUsers()
        .subscribe((resp: any) => {
          this.gitUsers = resp;
        });
  }

}
