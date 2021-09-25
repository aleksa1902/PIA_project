import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';
import { Competition } from '../model/competition.models';
import { User } from '../model/user.model';
import { AthleteService } from '../services/athlete.service';
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-finishedcompetition',
  templateUrl: './finishedcompetition.component.html'
})
export class FinishedCompetitionComponent implements OnInit {
  displayedColumns: string[] = ['competition', 'discipline', 'location', 'date', 'athletes', 'results'];
  constructor(private serviceAthlete: AthleteService, private serviceCompetition: CompetitionService, private serviceUser: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "competitionDelegate"){
      this.ruter.navigate(['login']);
    }
    
    this.serviceCompetition.getFinishedCompetitions().subscribe((c:Competition[])=>{
        this.dataSource = new MatTableDataSource<Competition>(c);
    })
  }

  user: User;
  dataSource: MatTableDataSource<Competition>;
  

}
