import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete.model';
import { Country } from '../model/country.model';
import { Sport } from '../model/sport.model';
import { User } from '../model/user.model';
import { AthleteService } from '../services/athlete.service';
import { CountryService } from '../services/country.service';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-findathlete',
  templateUrl: './findathlete.component.html',
  styleUrls: ['./findathlete.component.css']
})
export class FindAthleteComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'gender', 'country', 'disciplines'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private serviceCountry: CountryService, private serviceSport: SportService, private serviceAthlete: AthleteService, private ruter: Router) { }

  ngOnInit(): void {
    this.serviceSport.getAllSports().subscribe((sport: Sport[])=>{
        this.sports = sport;
    });
    this.serviceCountry.getAllCountries().subscribe((countries: Country[])=>{
        this.countries = countries;
    })
  }
  sports: Sport[];
  countries: Country[];
  message: string;
  athletes: Athlete[];
  name: string;
  surname: string;
  gender: string;
  sport: string;
  discipline: string;
  medalWinner: boolean;
  nameSport: string[];
  dataSource: MatTableDataSource<Athlete>;

  findAthletes(){
    if(this.name == undefined && this.surname == undefined && this.sport == undefined){
      this.serviceAthlete.getAllAthletes().subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else if(this.name != undefined && this.surname == undefined && this.sport == undefined){
      this.serviceAthlete.getAthleteByName(this.name).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else if(this.name == undefined && this.surname != undefined && this.sport == undefined){
      this.serviceAthlete.getAthleteBySurname(this.surname).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else if(this.name != undefined && this.surname != undefined && this.sport == undefined){
      this.serviceAthlete.getAthleteByNameSurname(this.name, this.surname).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else if(this.name == undefined && this.surname == undefined && this.sport != undefined){
      this.serviceAthlete.getAthleteBySport(this.sport).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else if(this.name != undefined && this.surname == undefined && this.sport != undefined){
      this.serviceAthlete.getAthleteByNameSport(this.name, this.sport).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else if(this.name == undefined && this.surname != undefined && this.sport != undefined){
      this.serviceAthlete.getAthleteBySurnameSport(this.surname, this.sport).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }else{
      this.serviceAthlete.getAthleteByNameSurnameSport(this.name, this.surname, this.sport).subscribe((a : Athlete[])=>{
        this.athletes = a;
        this.dataSource = new MatTableDataSource<Athlete>(a);
        this.dataSource.paginator = this.paginator;
      })
    }
  }

}
