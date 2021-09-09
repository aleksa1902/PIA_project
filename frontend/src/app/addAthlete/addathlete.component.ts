import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';
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

  addAthlete(){
    if(this.name != undefined && this.surname != undefined && this.discipline != undefined && this.gender != undefined){
        this.serviceAthlete.findAthlete(this.name, this.surname).subscribe((a : Athlete)=>{
            if(a){
                let disc = false;
            
                for(let i = 0; i < a.disciplines.length; i++){
                    if(a.disciplines[i] == this.discipline){
                        disc = true;
                        break;
                    }
                }
                if(!disc){
                    this.serviceAthlete.addDiscipline(this.name, this.surname, this.discipline).subscribe(e=>{
                      if(e['addDiscipline']=='ok'){
                        this.ruter.navigate(['headOfTheNationalDelegation']);
                      }else{
                        this.message = "Error #1";
                      }     
                    })
                } 
            }else{
              //console.log("OVDE SAM");
              //console.log(this.name + " " + this.surname + " " + this.gender + " " + this.user.country + " " + this.discipline);
                this.serviceAthlete.addAthlete(this.name, this.surname, this.user.country, this.gender, this.discipline).subscribe(e=>{
                  if(e['newAthlete']=='ok'){
                    this.ruter.navigate(['headOfTheNationalDelegation']);
                  }else{
                    this.message = "Error #2";
                  }
                })
            }
        })
    }else{
      this.message = "Something wrong";
    }
  }
  

}
