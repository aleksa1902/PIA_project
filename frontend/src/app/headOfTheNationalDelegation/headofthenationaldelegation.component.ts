import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-headOfTheNationalDelegation',
  templateUrl: './headofthenationaldelegation.component.html'
})
export class HeadOfTheNationalDelegationComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "headOfTheNationalDelegation"){
      this.ruter.navigate(['login']);
    }
    
  }

  user: User;

  

}
