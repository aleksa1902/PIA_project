import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html'
})
export class OrganizerComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "organizer"){
      this.ruter.navigate(['login']);
    }
    
  }

  user: User;

  logout(){
    this.user = null;
    localStorage.removeItem('registered');
    console.log(localStorage.getItem('registered'));

    this.ruter.navigate(['']);
  }

  addSport(){
    this.ruter.navigate(['addSport']);
  }

}
