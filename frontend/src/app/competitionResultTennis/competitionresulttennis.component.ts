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
  selector: 'app-competitionresulttennis',
  templateUrl: './competitionresulttennis.component.html'
})
export class CompetitionResultTennisComponent implements OnInit {
  displayedColumns: string[] = ['match', 'result'];
  constructor(private serviceAthlete: AthleteService, private serviceCompetition: CompetitionService, private serviceUser: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "competitionDelegate"){
      this.ruter.navigate(['login']);
    }
    let name = JSON.parse(localStorage.getItem('setDate'));
    console.log(name);

    if(name){
      this.serviceCompetition.getCompetition(name).subscribe((c: Competition)=>{
        this.competition = c;

        for(let i = 0; i < this.competition.athletes.length; i=i+2){
          this.test.push(this.competition.athletes[i] + ":" + this.competition.athletes[i+1]);
        }
        console.log(this.test);
        this.dataSource = new MatTableDataSource<string>(this.test);
      })
    }
  }
  test = [];
  user: User;
  dataSource: MatTableDataSource<string>;
  competition: Competition;
  results: string[] = [];
  format: string;
  numberFormat: number;
  goldAthlete: Athlete = null;
  silverAthlete: Athlete = null;
  bronzeAthlete: Athlete = null;
  

  setResult(){
    let winners = [];
    let lossers = [];
    
    for(let i = 0; i < this.results.length; i++){
      let fr = this.results[i].split(":")[0];
      let sr = this.results[i].split(":")[1];

      if(fr > sr){
        winners.push(this.test[i].split(":")[0]);
        lossers.push(this.test[i].split(":")[1]);
      }else{
        winners.push(this.test[i].split(":")[1]);
        lossers.push(this.test[i].split(":")[0]);
      }
    }

    console.log(winners);
    console.log(lossers);

    if(this.competition.format == 'tennis 4'){
      console.log("IDEMO U FINALE");
      let final = [];
      
      final.push(winners[0]);
      final.push(winners[1]);
      final.push(lossers[0]);
      final.push(lossers[1]);

      console.log(final);

      this.serviceCompetition.updateTennisResult(this.competition.competition, final, 'tennis final').subscribe(e=>{
        if(e['updatedTennis']=='ok'){
          this.ruter.navigate(['competitionDelegate']);
        }else{
          console.log("GRESKA");
        }
      })

    }else if(this.competition.format == 'tennis 8'){
      console.log("IDEMO U POLUFINALE");

      this.serviceCompetition.updateTennisResult(this.competition.competition, winners, 'tennis 4').subscribe(e=>{
        if(e['updatedTennis']=='ok'){
          this.ruter.navigate(['competitionDelegate']);
        }else{
          console.log("GRESKA");
        }
      })

    }else if(this.competition.format == 'tennis 16'){
      console.log("IDEMO U CETVRTFINALE");

      this.serviceCompetition.updateTennisResult(this.competition.competition, winners, 'tennis 8').subscribe(e=>{
        if(e['updatedTennis']=='ok'){
          this.ruter.navigate(['competitionDelegate']);
        }else{
          console.log("GRESKA");
        }
      })
    }else{
      console.log("CUVAJ MEDALJE");

      let name = winners[0].split(',')[0];
      let surname = winners[0].split(',')[1];

      this.serviceAthlete.getAthleteByNameSurname(name, surname).subscribe((a: Athlete)=>{
        if(a){
          this.goldAthlete = a;
         
          console.log("GOLD");
          console.log(a);
  
          name = lossers[0].split(',')[0];
          surname = lossers[0].split(',')[1];
  
          this.serviceAthlete.getAthleteByNameSurname(name, surname).subscribe((a: Athlete)=>{
            if(a){
              this.silverAthlete = a;

              console.log("SILVER");
              console.log(a);
  
              name = winners[1].split(',')[0];
              surname = winners[1].split(',')[1];
  
              this.serviceAthlete.getAthleteByNameSurname(name, surname).subscribe((a: Athlete)=>{
                if(a){
                  this.bronzeAthlete = a;

                  console.log("BRONZE");
                  console.log(a);
  
                  this.serviceCompetition.updateResults(this.competition.competition, this.goldAthlete[0].country, this.silverAthlete[0].country, this.bronzeAthlete[0].country).subscribe(e=>{
                    if(e['gold']=='ok' && e['silver']=='ok' && e['bronze']=='ok'){
                      console.log("KUL");
                    }else{
                      console.log("NOT KUL");
                    }
                  })
                }
              })
            }
          })
        }
      })
    }


  }

}
