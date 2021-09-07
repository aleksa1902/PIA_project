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
                    this.serviceUser.changePassword(this.username, this.newPassword).subscribe(s=>{
                        if(s['changePass'] == "ok"){
                            this.ruter.navigate(['login']);
                        }else{
                            this.message = "Greska";
                        }
                    })
                }
            }
        })
    }
  
  }