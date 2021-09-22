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
  selector: 'app-competitionresult',
  templateUrl: './competitionresult.component.html'
})
export class CompetitionResultComponent implements OnInit {
  displayedColumns: string[] = ['athlete', 'result'];
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
        console.log(this.competition);
        this.dataSource = new MatTableDataSource<string>(this.competition.athletes);

        let disc = this.competition.discipline;
        let sport = this.competition.sport;

        if(disc == '100 Metres' || disc == '200 Metres' || disc == '400 Metres' || disc == '100m Butterfly' || disc == '200m Freestyle'){
          this.format = '(SS,TT)';
          this.numberFormat = 1;
        }else if(disc == '800 Metres' || disc == '5000 Metres' || disc == '10000 Metres'){
          this.format = '(MM:SS,TT)';
          this.numberFormat = 2;
        }else if(disc == 'Marathon' || disc == '20 Kilometers Race Walk' || disc == '50 Kilometers Race Walk' || disc == 'Road Race 225km'){
          this.format = '(HH:MM:SS)';
          this.numberFormat = 3;
        }else if(disc == 'Long Jump' || disc == 'High Jump' || disc == 'Triple Jump' || disc == 'Pole Valut' || disc == 'Shot Put' || disc == 'Discus Throw' || disc == 'Hammer Throw' || disc == 'Javelin Throw'){
          this.format = '(M:CM)';
          this.numberFormat = 4;
        }else if(sport == 'shooting'){
          this.format = '(1,2,3,4,5,6)';
          this.numberFormat = 5;
        }
      })
    }
  }

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
    let sorted = [];
    for(let i = 0; i < this.results.length; i++){
      if(this.results[i].search(','))
        sorted.push({index: i, result: this.results[i]});
      else
        console.log("GRESKA");
    }

    if(this.numberFormat == 1){  
      sorted.sort((first, second)=>{
        let f_ss = first.result.split(',')[0];
        let f_tt = first.result.split(',')[1];
        let f = 1000 * f_ss + f_tt;
        
        let s_ss = second.result.split(',')[0];
        let s_tt = second.result.split(',')[1];
        let s = 1000 * s_ss + s_tt;

        return f - s;
      });

      console.log(sorted); // radi

    }else if(this.numberFormat == 2){
      sorted.sort((first, second)=>{
        let f_mm = first.result.split(':')[0];
        let f_ss_tt = first.result.split(':')[1];
        let f_ss = f_ss_tt.split(',')[0];
        let f_tt = f_ss_tt.split(',')[1];
        let f = 60000 * f_mm + 60 * f_ss + f_tt;
        
        let s_mm = second.result.split(':')[0];
        let s_ss_tt = second.result.split(':')[1];
        let s_ss = s_ss_tt.split(',')[0];
        let s_tt = s_ss_tt.split(',')[1];
        let s = 60000 * s_mm + 60 * s_ss + s_tt;

        return f - s;
      })
    }else if(this.numberFormat == 3){
      sorted.sort((first, second)=>{
        let f_hh = first.result.split(':')[0];
        let f_mm = first.result.split(':')[1];
        let f_ss = first.result.split(':')[2];
        let f = 3600 * f_hh + 60 * f_mm + f_ss;

        let s_hh = second.result.split(':')[0];
        let s_mm = second.result.split(':')[1];
        let s_ss = second.result.split(':')[2];
        let s = 3600 * s_hh + 60 * s_mm + s_ss;

        return f - s;
      })
    }else if(this.numberFormat == 4){
      sorted.sort((first, second)=>{
        let f_m = first.result.split(',')[0];
        let f_cm = first.result.split(',')[1];
        let f = 100 * f_m + f_cm;

        let s_m = second.result.split(',')[0];
        let s_cm = second.result.split(',')[1];
        let s = 100 * s_m + s_cm;

        return s - f;
      })
    }else if(this.numberFormat == 5){
      sorted.sort((first, second)=>{
        let f1 = first.result.split(',')[0];
        let f2 = first.result.split(',')[1];
        let f3 = first.result.split(',')[2];
        let f4 = first.result.split(',')[3];
        let f5 = first.result.split(',')[4];
        let f6 = first.result.split(',')[5];
        let f = f1 + f2 + f3 + f4 + f5 + f6;
        

        let s1 = second.result.split(',')[0];
        let s2 = second.result.split(',')[1];
        let s3 = second.result.split(',')[2];
        let s4 = second.result.split(',')[3];
        let s5 = second.result.split(',')[4];
        let s6 = second.result.split(',')[5];
        let s = s1 + s2 + s3 + s4 + s5 + s6;

        return s - f;
      })
    }

    let name = this.competition.athletes[sorted[0].index].split(',')[0];
    let surname = this.competition.athletes[sorted[0].index].split(',')[1];


    this.serviceAthlete.getAthleteByNameSurname(name, surname).subscribe((a: Athlete)=>{
      if(a){
        this.goldAthlete = a;

        name = this.competition.athletes[sorted[1].index].split(',')[0];
        surname = this.competition.athletes[sorted[1].index].split(',')[1];

        this.serviceAthlete.getAthleteByNameSurname(name, surname).subscribe((a: Athlete)=>{
          if(a){
            this.silverAthlete = a;

            name = this.competition.athletes[sorted[2].index].split(',')[0];
            surname = this.competition.athletes[sorted[2].index].split(',')[1];

            this.serviceAthlete.getAthleteByNameSurname(name, surname).subscribe((a: Athlete)=>{
              if(a){
                this.bronzeAthlete = a;

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
