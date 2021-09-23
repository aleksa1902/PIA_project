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

            let testVelikoSlovo = /[A-Z]/.test(this.password);
            let testTriMalaSlova = /[[a-z].*[a-z].*[a-z]/.test(this.password);
            let testDvaSpecKaraktera = /[\?\.\*\$\^\&\!\@\#,].*[\?\.\*\$\^\&\!\@\#,]/.test(this.password);
            let testPocetniKarakter = /^[a-zA-Z]/.test(this.password);
            let testBrojevi = /\d.*\d/.test(this.password);
            let testUzastopnaSlova = /[a-z][A-Z]{4}/.test(this.password);

            if(testVelikoSlovo && testTriMalaSlova && testDvaSpecKaraktera && testPocetniKarakter && testBrojevi && !testUzastopnaSlova && this.password.length >= 8 && this.password.length <= 12){
              this.serviceUser.register(this.name, this.surname, this.email, this.username, this.password, this.country, this.userType).subscribe(ob=>{
                if(ob['newUser']=='ok'){
                  console.log('User added');
                  this.ruter.navigate(['login']);
                }else{
                  console.log("greska");
                }
              })
            }else{
              this.message = "Password creation rules: must have a minimum of 8 characters and a maximum of 12 characters. The minimum number of uppercase letters is 1, the minimum number of lowercase letters is 3, the minimum number of numbers is 2, and the minimum number of special characters is also 2. The initial character must be lowercase or uppercase. The maximum number of consecutive characters is three.";
            }
          }
        })

      }
    }
  
  }