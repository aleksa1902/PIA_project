import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../model/country.model';
import { CountryService } from '../services/country.service';


@Component({
    selector: 'app-searchathletes',
    templateUrl: './searchathletes.component.html'
  })
  export class SearchAthletesComponent implements OnInit {

    constructor(private serviceCountry : CountryService, private ruter: Router) { }
  
    ngOnInit(): void {
        this.serviceCountry.getAllCountries().subscribe((countries: Country[])=>{
            this.countries = countries;
          });
    }
  
    countries : Country[];

    
  }