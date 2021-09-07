import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../model/country.model';
import { CountryService } from '../services/country.service';


@Component({
    selector: 'app-listcountries',
    templateUrl: './listcountries.component.html'
  })
  export class ListCountriesComponent implements OnInit {
  
    constructor(private serviceCountry : CountryService, private ruter: Router) { }
  
    ngOnInit(): void {
        this.serviceCountry.getAllCountries().subscribe((countries: Country[])=>{
            this.countries = countries;
            //console.log(this.countries);
          });
    }
  
    countries : Country[];
  
    
  }