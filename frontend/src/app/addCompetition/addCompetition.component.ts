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
            this.serviceAthlete.competitionStart(sportName, sportDiscipline).subscribe((c:Competition)=>{
              if(c){
                this.message = "competition exists";
              }else{
                console.log(this.format);
                console.log(this.sport);
                let disc = this.sport.split(",")[1];
                if(this.format == "final 8" && disc != "Singles"){
                  if(this.athlete.length > 2 && this.athlete.length <= 8){
                    this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, false, this.athlete).subscribe(ob=>{
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
                }else if(this.format != "final 8" && disc == "Singles"){
                  if(this.format == "tennis 4" && this.athlete.length == 4){

                    let test = [];
                    // 1-4 2-3
                    test.push(this.athlete[0]);
                    test.push(this.athlete[3]);
                    test.push(this.athlete[1]);
                    test.push(this.athlete[2]);

                    console.log(this.athlete);
                    console.log(test);

                    this.athlete = test;

                    console.log(this.athlete);

                    this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, false, this.athlete).subscribe(ob=>{
                      if(ob['newCompetition']=='ok'){
                        console.log('Sport added');
                        this.ruter.navigate(['organizer']);
                      }else{
                        console.log("greska");
                      }
                    })
                  }else if(this.format == "tennis 8" && this.athlete.length == 8){

                    let test = [];
                    // 1-8 4-5 3-6 2-7
                    test.push(this.athlete[0]);
                    test.push(this.athlete[7]);
                    test.push(this.athlete[3]);
                    test.push(this.athlete[4]);
                    test.push(this.athlete[2]);
                    test.push(this.athlete[5]);
                    test.push(this.athlete[1]);
                    test.push(this.athlete[6]);

                    console.log(this.athlete);
                    console.log(test);

                    this.athlete = test;

                    console.log(this.athlete);

                    this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, false, this.athlete).subscribe(ob=>{
                      if(ob['newCompetition']=='ok'){
                        console.log('Sport added');
                        this.ruter.navigate(['organizer']);
                      }else{
                        console.log("greska");
                      }
                    })
                  }else if(this.format == "tennis 16" && this.athlete.length == 16){

                    let test = [];
                    // 1-16 8-9 5-12 4-13 3-14 6-11 7-10 2-15
                    test.push(this.athlete[0]);
                    test.push(this.athlete[15]);
                    test.push(this.athlete[7]);
                    test.push(this.athlete[8]);
                    test.push(this.athlete[4]);
                    test.push(this.athlete[11]);
                    test.push(this.athlete[3]);
                    test.push(this.athlete[12]);
                    test.push(this.athlete[2]);
                    test.push(this.athlete[13]);
                    test.push(this.athlete[5]);
                    test.push(this.athlete[10]);
                    test.push(this.athlete[6]);
                    test.push(this.athlete[9]);
                    test.push(this.athlete[1]);
                    test.push(this.athlete[14]);

                    console.log(this.athlete);
                    console.log(test);

                    this.athlete = test;

                    console.log(this.athlete);

                    this.serviceCompetition.addCompetition(this.competition, this.gender, this.format, sportName, sportDiscipline, this.delegate, false, this.athlete).subscribe(ob=>{
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
              }
            })
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
    this.athlete = null;
  }

  added(){
    console.log(this.athlete);
  }
  

}
