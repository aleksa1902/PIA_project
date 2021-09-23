import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.ruter.events.subscribe((ev)=>{
      this.user = JSON.parse(localStorage.getItem('registered'));
    })
  }

  user: User;
  organizer = 'organizer';
  headOfTheNationalDelegation = 'headOfTheNationalDelegation';
  competitionDelegate = 'competitionDelegate';

  goHome(){
    this.ruter.navigate(['home']);
  }

  logout(){
    this.user = null;
    localStorage.removeItem('registered');
    console.log(localStorage.getItem('registered'));

    this.ruter.navigate(['home']);
  }

  addSport(){
    this.ruter.navigate(['addSport']);
  }

  findAthlete(){
    this.ruter.navigate(['findAthlete']);
  }

  addCompetition(){
    this.ruter.navigate(['addCompetition']);
  }

  addAthlete(){
    this.ruter.navigate(['addAthlete']);
  }

  addAthleteJSON(){
    this.ruter.navigate(['addAthleteJSON']);
  }

  myProfile(){
    this.ruter.navigate(['competitionDelegate']);
  }

  routerRegister(){
    this.ruter.navigate(['register']);
  }

  changePassword(){
    this.ruter.navigate(['changePassword']);
  }

  listCountries(){
    this.ruter.navigate(['listCountries']);
  }

  listMedals(){
    this.ruter.navigate(['listMedals']);
  }

  login(){
    this.ruter.navigate(['login']);
  }
  
}