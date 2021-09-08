import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../model/sport.model';
import { User } from '../model/user.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-addsport',
  templateUrl: './addsport.component.html',
  styleUrls: ['./addsport.component.css']
})
export class AddSportComponent implements OnInit {

  constructor(private serviceSport: SportService, private ruter: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('registered'))
    if(this.user.userType != "organizer"){
      this.ruter.navigate(['login']);
    }
    
  }

  user: User;
  sport: string;
  discipline: string;
  type: string;
  min: string;
  max: string;
  message: string;

  addSport(){
    if(this.sport == undefined || this.type == undefined){
      this.message = "Form is not full";
    }else if(this.sport != undefined && this.discipline != undefined && this.type == "team"){
      if(this.min == undefined || this.max == undefined){
        this.message = "Wrong";
      }else if(this.min != undefined && this.max != undefined){

        this.serviceSport.addSport(this.sport, this.discipline, this.type, this.min, this.max).subscribe(ob=>{
          if(ob['newSport']=='ok'){
            console.log('Sport added');
            this.ruter.navigate(['organizer']);
          }else{
            console.log("greska");
          }
        })
      }
    }else if(this.sport != undefined && this.discipline != undefined && this.type == "individual"){
      this.serviceSport.addSport(this.sport, this.discipline, this.type, null, null).subscribe(ob=>{
        if(ob['newSport']=='ok'){
          console.log('Sport added');
          this.ruter.navigate(['organizer']);
        }else{
          console.log("greska");
        }
      })
      
    }else if(this.sport != undefined && this.discipline == undefined && this.type != undefined){
      if(this.type == "team" && this.min != undefined && this.max != undefined){
        this.serviceSport.findSportWithoutDiscipline(this.sport, null, this.type, this.min, this.max).subscribe((s: Sport)=>{
          if(s){
            this.message = "We have this sport.";
          }else{
            this.serviceSport.addSport(this.sport, null, this.type, this.min, this.max).subscribe(ob=>{
              if(ob['newSport']=='ok'){
                console.log('Sport added');
                this.ruter.navigate(['organizer']);
              }else{
                console.log("greska");
              }
            });
          }
        })
      }else if(this.type == "individual"){
        this.serviceSport.addSport(this.sport, null, this.type, null, null).subscribe(ob=>{
          if(ob['newSport']=='ok'){
            console.log('Sport added');
            this.ruter.navigate(['organizer']);
          }else{
            console.log("greska");
          }
        })
      }else{
        this.message = "WRONG";
      }
    }
  }

}
