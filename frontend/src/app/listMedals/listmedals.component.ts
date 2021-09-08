import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../model/country.model';
import { CountryService } from '../services/country.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


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
            console.log(this.countries);
            this.dataSource = new MatTableDataSource<Country>(countries);
            this.dataSource.paginator = this.paginator;
            console.log(this.dataSource);
          });
    }

    ngAfterViewInit() {
      
    }
  
    countries : Country[];
    dataSource: MatTableDataSource<Country>;
    
  }
