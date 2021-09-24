import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../model/country.model';
import { CountryService } from '../services/country.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CountryMedal } from '../model/countryMedal.model';


@Component({
    selector: 'app-listmedals',
    templateUrl: './listmedals.component.html'
  })
  export class ListMedalsComponent implements OnInit {
    displayedColumns: string[] = ['rang', 'name', 'gold', 'silver', 'bronze', 'total'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private serviceCountry : CountryService, private ruter: Router) { }
  
    ngOnInit(): void {
        this.serviceCountry.getAllCountries().subscribe((countries: Country[])=>{
            this.countries = countries;
            
            this.countries.sort((first, second)=>{
              let f = first.goldMedals;
              let s = second.goldMedals;
              return s - f;
            })

            for(let i = 0; i < this.countries.length; i++){
              this.test[i] = new CountryMedal();
              this.test[i].index = i + 1;
              this.test[i].name = this.countries[i].name;
              this.test[i].goldMedals = this.countries[i].goldMedals;
              this.test[i].silverMedals = this.countries[i].silverMedals;
              this.test[i].bronzeMedals = this.countries[i].bronzeMedals;
            }

            console.log(this.test);

            this.dataSource = new MatTableDataSource<CountryMedal>(this.test);
            console.log(this.dataSource);
            this.dataSource.paginator = this.paginator;
            console.log(this.dataSource);
          });
    }

    ngAfterViewInit() {
      
    }
    
    test: CountryMedal[] = [];
    countries : Country[];
    dataSource: MatTableDataSource<CountryMedal>;
    
  }
