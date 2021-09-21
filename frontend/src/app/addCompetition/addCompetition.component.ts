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
  selector: 'app-addcompetition',
  templateUrl: './addcompetition.component.html'
})
export class AddCompetitionComponent implements OnInit {

  constructor(private serviceCompetition: CompetitionService, private serviceAthlete: AthleteService, private serviceUser: UserService, private serviceSport: SportService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "organizer"){
      this.ruter.navigate(['login']);
    }
    this.serviceSport.getIndividualSport().subscribe((countries: Sport[])=>{
        this.sports = countries;
    });

    this.serviceUser.getAllDelegates().subscribe((delegates: User[])=>{
      this.delegates = delegates;
    });
    
  }

  user: User;
  sports: Sport[];
  sport: string;
  competition: string;
  gender: string;
  format: string;
  formats: string[] = ['final 8', 'tennis 4', 'tennis 8', 'tennis 16'];
  delegate: string;
  delegates: User[];
  athletes: Athlete[];
  athlete: string[];
  message: string;



  addCompetition(){
    if(this.competition == undefined || this.gender == undefined || this.format == undefined || this.sport == undefined ||
      this.delegate == undefined || this.athlete == undefined){
        this.message = "ERROR";
      }else{
        this.serviceUser.checkDelegate(this.delegate).subscribe((u: Competition[])=>{
          console.log(u);
          let sportName = this.sport.split(",")[0];
          let sportDiscipline = this.sport.split(",")[1];
          if(u.length < 3){
            if(this.format == "final 8" && this.sport != "Singles"){
              if(this.athlete.length > 0 && this.athlete.length <= 8){
                this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, this.athlete).subscribe(ob=>{
                  if(ob['newCompetition']=='ok'){
                    console.log('Sport added');
                    this.ruter.navigate(['organizer']);
                  }else{
                    console.log("greska");
                  }
                })
              }else{
                this.message = "Not enough athlete.";
              }
            }else if(this.format != "final 8" && this.sport == "Singles"){
              if(this.format == "tennis 4" && this.athlete.length == 4){
                this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, this.athlete).subscribe(ob=>{
                  if(ob['newCompetition']=='ok'){
                    console.log('Sport added');
                    this.ruter.navigate(['organizer']);
                  }else{
                    console.log("greska");
                  }
                })
              }else if(this.format == "tennis 8" && this.athlete.length == 8){
                this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, this.athlete).subscribe(ob=>{
                  if(ob['newCompetition']=='ok'){
                    console.log('Sport added');
                    this.ruter.navigate(['organizer']);
                  }else{
                    console.log("greska");
                  }
                })
              }else if(this.format == "tennis 16" && this.athlete.length == 16){
                this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, this.athlete).subscribe(ob=>{
                  if(ob['newCompetition']=='ok'){
                    console.log('Sport added');
                    this.ruter.navigate(['organizer']);
                  }else{
                    console.log("greska");
                  }
                })
              }else{
                this.message = "Noth enough for tennis.";
              }
            }
          }else{
            this.message = "Error delegate.";
          }
        })
        
      }
  }

  getAthletes(){
    console.log(this.sport);
    let discipline = this.sport.split(",")[1];
    this.serviceAthlete.getAthleteBySportGender(discipline, this.gender).subscribe((a: Athlete[])=>{
      this.athletes = a;
    })
  }

  added(){
    console.log(this.athlete);
  }

  changeSport(){
    if(this.format != "final 8"){
      this.serviceSport.getTennis().subscribe((s: Sport[])=>{
        this.sports = s;
      })
    }else{
      this.serviceSport.getIndividualSport().subscribe((s: Sport[])=>{
        this.sports = s;
      })
    }
  }
  

}
