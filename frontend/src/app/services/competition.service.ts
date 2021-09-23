import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addCompetition(competition, gender, format, sportName, sportDiscipline, delegate, finished, athlete){
    const data={
      competition: competition,
      sport: sportName,
      discipline: sportDiscipline,
      format: format,
      gender: gender,
      location: null,
      time: null,
      delegate: delegate,
      finished: finished,
      athletes: athlete
    }

    return this.http.post(`${this.uri}/addCompetition`, data); 
  }

  getAll(){
    return this.http.get(`${this.uri}/getAllCompetition`);
  }

  getCompetition(name){
    const data={
      name: name
    }
    return this.http.post(`${this.uri}/getCompetition`, data); 
  }

  updateCompetition(name, location, date){
    const data={
      name: name,
      location: location,
      date: date
    }
    return this.http.post(`${this.uri}/updateCompetition`, data); 
  }

  updateResults(name, gc, sc, bc){
    const data={
      name: name,
      gc: gc,
      sc: sc,
      bc: bc
    }
    return this.http.post(`${this.uri}/updateResults`, data); 
  }

  updateTennisResult(name, athletes, format){
    const data={
      name: name,
      athletes: athletes,
      format: format
    }
    return this.http.post(`${this.uri}/updateTennisResult`, data); 
  }

}
