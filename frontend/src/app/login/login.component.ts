import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
  
    constructor(private serviceUser: UserService, private ruter: Router) { }
  
    ngOnInit(): void {
    }
  
    username: string;
    password: string;
    message: string;
  
    loginToTheSystem(){
      this.serviceUser.loginToTheSystem(this.username, this.password).subscribe((user: User)=>{
        if(!user){
          this.message = 'Bad credentials';
        }
        else{
          localStorage.setItem('registered', JSON.stringify(user));
          if(user.userType=="organizer"){
            this.ruter.navigate(['organizer']);
          }
          else if(user.userType=="competitionDelegate"){
            this.ruter.navigate(['competitionDelegate']);
          }else{
            this.ruter.navigate(['headOfTheNationalDelegation']);
          }
        }
      })
    }
  
  }