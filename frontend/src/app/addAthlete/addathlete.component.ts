import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';
import { Competition } from '../model/competition.models';
import { Country } from '../model/country.model';
import { Sport } from '../model/sport.model';
import { User } from '../model/user.model';
import { AthleteService } from '../services/athlete.service';
import { CountryService } from '../services/country.service';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-addathlete',
  templateUrl: './addathlete.component.html',
  styleUrls: ['./addathlete.component.css']
})
export class AddAthleteComponent implements OnInit {

  constructor(private serviceCountry: CountryService, private serviceSport: SportService, private serviceAthlete: AthleteService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "headOfTheNationalDelegation"){
      this.ruter.navigate(['login']);
    }
    this.serviceSport.getAllSports().subscribe((countries: Sport[])=>{
        this.sports = countries;
      });
  }

  user: User;
  name: string;
  surname: string;
  discipline: string;
  gender: string;
  sports: Sport[];
  message: string;
  disc = false;

  addAthlete(){
    if(this.name != undefined && this.surname != undefined && this.discipline != undefined && this.gender != undefined){
      let sportName = this.discipline.split(",")[0];
      let discipline = this.discipline.split(",")[1];


      this.serviceAthlete.findAthlete(this.name, this.surname).subscribe((a : Athlete)=>{
        if(a){      
          
            for(let i = 0; i < a.disciplines.length; i++){  
              if(a.disciplines[i] == discipline && this.disc == false){ 
                  this.disc = true;
                  break;
                }
            }

            this.serviceAthlete.competitionStart(sportName, discipline).subscribe((c:Competition)=>{
              if(c){
                this.message = "Competition has started.";
              }else{
                if(this.disc == false){
                  this.serviceAthlete.addDiscipline(this.name, this.surname, discipline).subscribe(e=>{
                    if(e['addDiscipline']=='ok'){
                      this.ruter.navigate(['headOfTheNationalDelegation']);
                    }else{
                      console.log("e");
                      this.message = "Error #1";
                    }     
                  })
                }else{
                  this.message = "That athlete is already registered for that discipline.";
                } 
              }
            })

              
        }else{
          this.serviceAthlete.competitionStart(sportName, discipline).subscribe((c:Competition)=>{
            if(c){
              this.message = "Competition has started";
            }else{
              this.serviceAthlete.addAthlete(this.name, this.surname, this.user.country, this.gender, discipline).subscribe(e=>{
                if(e['newAthlete']=='ok'){
                  this.ruter.navigate(['headOfTheNationalDelegation']);
                }else{
                  this.message = "Error #2";
                }
              })
            }
          })
          
        }
        })
    }else{
      this.message = "Enter all fields.";
    }
  }
  

}
