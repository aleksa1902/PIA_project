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

  setDate(name){
    localStorage.setItem('setDate', JSON.stringify(name));
    console.log(name);
    this.ruter.navigate(['dateCompetition']);
  }

  setResult(name){
    localStorage.setItem('setResult', JSON.stringify(name));
    console.log(name);
    
    this.serivceCompetition.getCompetition(name).subscribe((c: Competition)=>{
      if(c.sport == 'tennis'){
        this.ruter.navigate(['competitionResultTennis']);
      }else{
        this.ruter.navigate(['competitionResult']);
      }
    })
  }

}
