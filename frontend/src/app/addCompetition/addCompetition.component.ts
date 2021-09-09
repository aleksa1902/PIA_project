import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../model/sport.model';
import { User } from '../model/user.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-addcompetition',
  templateUrl: './addcompetition.component.html'
})
export class AddCompetitionComponent implements OnInit {

  constructor(private serviceSport: SportService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "organizer"){
      this.ruter.navigate(['login']);
    }
    this.serviceSport.getAllSports().subscribe((countries: Sport[])=>{
        this.sports = countries;
      });
    
  }

  user: User;
  sports: Sport[];
  sport: string;
  competition: string;
  format: string;

  addCompetition(){
      this.serviceSport.addCompetition(this.competition, this.sport, this.format);
  }
  

}
