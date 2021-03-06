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
    this.sport = JSON.parse(localStorage.getItem('setDate1'));
    this.discipline = JSON.parse(localStorage.getItem('setDate2'));
    console.log(this.name);

    if(this.name){
      this.serviceCompetition.getCompetition(this.name, this.sport, this.discipline).subscribe((c: Competition)=>{
        this.comp = c;
        console.log(this.comp);
      })
    }
    
  }

  user: User;
  name: string;
  sport: string;
  discipline: string;
  comp: Competition;
  location: string;
  date: Date;
  time: Date;
  message: string;
  locations = ['Olympic Stadium', 'Tokyo Metropolitan Gymnasium', 'Yoyogi National Stadium', 'Nippon Budokan', 'Musashino Forest Sport Plaza', 'Tokyo Stadium', 'Ariake Arena', 'Ariake Gymnastics Centre', 'Ariake Tennis Park', 'Asaka Shooting Range', 'Tokyo Aquatics Centre', 'Sapporo Odori Park', 'Musashinonomori Park', 'Fuji International Speedway'];


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
    testDate.setSeconds(0);
    testDate.setMilliseconds(0);
    
    testDate.setFullYear(parseInt(year));
    testDate.setMonth(parseInt(month));
    testDate.setDate(parseInt(day));
    
    console.log(testDate);

    this.serviceCompetition.updateCompetition(this.comp.competition, this.comp.sport, this.comp.discipline, this.location, testDate).subscribe(e=>{
      if(e['updatedComp']=='ok'){
        this.ruter.navigate(['competitionDelegate']);
      }else{
        this.message = "Error #1";
      }     
    })
    

    
  }

}
