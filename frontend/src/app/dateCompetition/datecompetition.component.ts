import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';
import { Competition } from '../model/competition.models';
import { Sport } from '../model/sport.model';
import { User } from '../model/user.model';
import { AthleteService } from '../services/athlete.service';
import { CompetitionService } from '../services/competition.service';
import { SportService } from '../services/sport.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-datecompetition',
  templateUrl: './datecompetition.component.html'
})
export class DateCompetitionComponent implements OnInit {

  constructor(private serviceCompetition: CompetitionService, private serviceAthlete: AthleteService, private serviceUser: UserService, private serviceSport: SportService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "competitionDelegate"){
      this.ruter.navigate(['login']);
    }
    this.name = JSON.parse(localStorage.getItem('setDate'));
    console.log(this.name);

    if(this.name){
      this.serviceCompetition.getCompetition(this.name).subscribe((c: Competition)=>{
        this.comp = c;
        console.log(this.comp);
      })
    }
    
  }

  user: User;
  name: string;
  comp: Competition;
  location: string;
  date: Date;
  time: Date;
  message: string;


  setDate(){
    console.log(this.location);
    console.log(this.date);
    console.log(this.time);
    
    console.log(this.comp.competition);
 
    let timeStr = this.time.toString();
    let hour = timeStr.split(':')[0];
    let minute = timeStr.split(':')[1];

    let dateStr = this.date.toString();
    let year = dateStr.split('-')[0];
    let month = dateStr.split('-')[1];
    let day = dateStr.split('-')[2];

    let testDate = new Date();
    testDate.setHours(parseInt(hour));
    testDate.setMinutes(parseInt(minute));
    
    testDate.setFullYear(parseInt(year));
    testDate.setMonth(parseInt(month));
    testDate.setDate(parseInt(day));
    
    console.log(testDate);

    this.serviceCompetition.updateCompetition(this.comp.competition, this.location, testDate).subscribe(e=>{
      if(e['updatedComp']=='ok'){
        this.ruter.navigate(['competitionDelegate']);
      }else{
        this.message = "Error #1";
      }     
    })
    

    
  }

}
