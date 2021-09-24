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
  selector: 'app-addathletejson',
  templateUrl: './addathletejson.component.html',
  styleUrls: ['./addathletejson.component.css']
})
export class AddAthleteJSONComponent implements OnInit {

  constructor(private serviceSport: SportService, private serviceAthlete: AthleteService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "headOfTheNationalDelegation"){
      this.ruter.navigate(['login']);
    }
  }

  user: User;
  message: string;

  file: any = null;

  fileAdded(event: any){
    this.file = event.target.files[0];
  }

  addAthleteJSON(){
    if(this.file != null){
        console.log(this.file);
        let reader = new FileReader();
        reader.readAsText(this.file, "UTF-8");
        console.log(reader);
        reader.onload = () => {
          if(reader.result != null){
            console.log(JSON.parse(reader.result.toString()));
            let athletes = JSON.parse(reader.result.toString());
            if(athletes){
                athletes.forEach((athlete: any) =>{
                    let test = false;
                    athlete.disciplines.forEach((discipline: string)=>{
                        console.log(athlete.name);
                        if(test){
                          console.log(athlete.name);
                          console.log(athlete.surname);
                          this.serviceAthlete.addDiscipline(athlete.name, athlete.surname, discipline).subscribe(e=>{
                            if(e['addDiscipline'] !='ok'){
                              console.log("GRESKA");
                            }
                          })
                        }else{
                            test = true;
                            this.serviceAthlete.addAthlete(athlete.name, athlete.surname, this.user.country, athlete.gender, discipline).subscribe(e=>{
                              if(e['newAthlete'] !='ok'){
                                console.log("GRESKA");
                              }      
                            })
                        }
                    })
                })
            }
            this.ruter.navigate(['headOfTheNationalDelegation']);
          }else{
            this.message = "Error";
            console.log("NEMAM NIST");
          }
        }
    }else{
      this.message = "You did not select a file.";
    }
  }
  

}
