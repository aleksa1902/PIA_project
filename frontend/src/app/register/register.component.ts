import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { Country } from '../model/country.model';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent implements OnInit {
  
    constructor(private serviceUser : UserService, private serviceCountry: CountryService, private ruter: Router) { }
  
    ngOnInit(): void {
        this.serviceCountry.getAllCountries().subscribe((countries: Country[])=>{
            this.countries = countries;
          });
    }
    
    name: string;
    surname: string;
    email: string;
    userType: string;
    username: string;
    password: string;
    passwordAgain: string;
    message: string;
    country: string;
    countries: Country[];
  
    register(){
      if(this.name == undefined || this.surname == undefined || this.email == undefined || 
        this.password == undefined || this.passwordAgain == undefined){
        this.message = "Fill in all the fields";
      }else if(this.userType == undefined && this.country == undefined){
        this.message = "User type and country are not defined.";
      }else if(this.userType == undefined){
        this.message = "User type is not defined.";
      }else if(this.country == undefined){
        this.message = "Country is not defined.";
      }else if(this.password != this.passwordAgain){
        this.message = "The passwords do not match.";
      }
      else{
        this.serviceUser.findUsername(this.username).subscribe((user: User)=>{
          if(user){
            this.message = 'This username is taken.';
          }else{
            console.log(this.name + " " + this.surname + " " + this.email + " " + this.username + " " + this.password + " "  + this.country + " " + this.userType);

            this.serviceUser.register(this.name, this.surname, this.email, this.username, this.password, this.country, this.userType).subscribe(ob=>{
              if(ob['newUser']=='ok'){
                console.log('User added');
                this.ruter.navigate(['login']);
              }else{
                console.log("greska");
              }
            })

          }
        })

      }
    }
  
  }