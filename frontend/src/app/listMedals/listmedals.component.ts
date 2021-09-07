import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Country } from '../model/country.model';
import { CountryService } from '../services/country.service';


@Component({
    selector: 'app-listmedals',
    templateUrl: './listmedals.component.html'
  })
  export class ListMedalsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private serviceCountry : CountryService, private ruter: Router) { }
  
    ngOnInit(): void {
        this.serviceCountry.getAllCountries().subscribe((countries: Country[])=>{
            this.countries = countries;
            this.dataSource = new MatTableDataSource(countries);
            console.log(this.dataSource);
          });
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    countries : Country[];
    dataSource: MatTableDataSource<Country>;
    
  }