import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css']
  })
  export class ChangePasswordComponent implements OnInit {
  
    constructor(private serviceUser: UserService, private ruter: Router) { }
  
    ngOnInit(): void {
    }
  
    username: string;
    oldPassword: string;
    newPassword: string;
    message: string;
  
    changePassword(){
        this.serviceUser.findUsername(this.username).subscribe((user : User)=>{
            if(!user){
                this.message = "This username does not exist.";
            }else{
                if(user.password != this.oldPassword){
                    this.message = "Old password is wrong.";
                }else if(this.oldPassword == this.newPassword){
                    this.message = "The old and new password are the same.";
                }else{

                    let testVelikoSlovo = /[A-Z]/.test(this.newPassword);
                    let testTriMalaSlova = /[[a-z].*[a-z].*[a-z]/.test(this.newPassword);
                    let testDvaSpecKaraktera = /[\?\.\*\$\^\&\!\@\#,].*[\?\.\*\$\^\&\!\@\#,]/.test(this.newPassword);
                    let testPocetniKarakter = /^[a-zA-Z]/.test(this.newPassword);
                    let testBrojevi = /\d.*\d/.test(this.newPassword);
                    let testUzastopnaSlova = /[a-z][A-Z]{4}/.test(this.newPassword);

                    if(testVelikoSlovo && testTriMalaSlova && testDvaSpecKaraktera && testPocetniKarakter && testBrojevi && !testUzastopnaSlova && this.newPassword.length >= 8 && this.newPassword.length <= 12){
                        this.serviceUser.changePassword(this.username, this.newPassword).subscribe(s=>{
                            if(s['changePass'] == "ok"){
                                this.ruter.navigate(['login']);
                            }else{
                                this.message = "Greska";
                            }
                        })
                    }else{
                        this.message = "Password creation rules: must have a minimum of 8 characters and a maximum of 12 characters. The minimum number of uppercase letters is 1, the minimum number of lowercase letters is 3, the minimum number of numbers is 2, and the minimum number of special characters is also 2. The initial character must be lowercase or uppercase. The maximum number of consecutive characters is three.";
                    }

                    
                }
            }
        })
    }
  
  }