import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SportService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addSport(name, discipline, type, min, max){
    const data={
      sport: name,
      discipline: discipline,
      type: type,
      min: min,
      max: max
    }
    return this.http.post(`${this.uri}/addSport`, data); 
  }

  findSportWithoutDiscipline(sport, discipline, type, min, max){
    const data={
      sport: sport,
      discipline: discipline,
      type: type,
      min: min,
      max: max
    }
    return this.http.post(`${this.uri}/findSportWithoutDiscipline`, data);
  }

  getAllSports(){
    return this.http.get(`${this.uri}/getAllSports`);
  }

  getIndividualSport(){
    return this.http.get(`${this.uri}/getIndividualSport`);
  }

  getTennis(){
    return this.http.get(`${this.uri}/getTennis`);
  }

  findSport(disc){
    const data={
      disc: disc
    }
    return this.http.post(`${this.uri}/findSport`, data);
  }

}
