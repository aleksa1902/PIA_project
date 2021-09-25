import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Competition } from '../model/competition.models';
import { User } from '../model/user.model';
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-competitiondelegate',
  templateUrl: './competitiondelegate.component.html'
})
export class CompetitionDelegateComponent implements OnInit {
  displayedColumns: string[] = ['competition', 'discipline', 'location', 'date', 'setDate', 'setResult'];
  constructor(private serivceCompetition: CompetitionService, private serviceUser: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "competitionDelegate"){
      this.ruter.navigate(['login']);
    }
    this.serviceUser.checkDelegate(this.user.username).subscribe((c: Competition[])=>{
        this.dataSource = new MatTableDataSource<Competition>(c);
    })
  }

  user: User;
  dataSource: MatTableDataSource<Competition>;

  logout(){
    //this.user = null;
    localStorage.removeItem('registered');
    console.log(localStorage.getItem('registered'));

    this.ruter.navigate(['']);
  }

  setDate(name, sport, discipline){
    localStorage.setItem('setDate', JSON.stringify(name));
    localStorage.setItem('setDate1', JSON.stringify(sport));
    localStorage.setItem('setDate2', JSON.stringify(discipline));
    console.log(name);
    this.ruter.navigate(['dateCompetition']);
  }

  setResult(name, sport, discipline){
    localStorage.setItem('setResult', JSON.stringify(name));
    localStorage.setItem('setResult1', JSON.stringify(sport));
    localStorage.setItem('setResult2', JSON.stringify(discipline));
    console.log(name);
    
    if(sport == 'tennis'){
      this.ruter.navigate(['competitionResultTennis']);
    }else{
      this.ruter.navigate(['competitionResult']);
    }

  }

}
