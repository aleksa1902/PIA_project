import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllCountries(){
    return this.http.get(`${this.uri}/getAllCountries`);
  }
}
