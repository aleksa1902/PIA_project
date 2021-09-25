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
      athletes: athlete,
      results: null
    }

    return this.http.post(`${this.uri}/addCompetition`, data); 
  }

  getAll(){
    return this.http.get(`${this.uri}/getAllCompetition`);
  }

  getCompetition(name, sport, discipline){
    const data={
      name: name,
      sport: sport,
      discipline: discipline
    }
    return this.http.post(`${this.uri}/getCompetition`, data); 
  }

  updateCompetition(name, sport, discipline, location, date){
    const data={
      name: name,
      sport: sport,
      discipline: discipline,
      location: location,
      date: date
    }
    return this.http.post(`${this.uri}/updateCompetition`, data); 
  }

  updateResults(name, sport, discipline, gc, sc, bc, results){
    const data={
      name: name,
      sport: sport,
      discipline: discipline,
      gc: gc,
      sc: sc,
      bc: bc,
      results: results
    }
    return this.http.post(`${this.uri}/updateResults`, data); 
  }

  updateTennisResult(name, sport, discipline, athletes, format){
    const data={
      name: name,
      sport: sport,
      discipline: discipline,
      athletes: athletes,
      format: format
    }
    return this.http.post(`${this.uri}/updateTennisResult`, data); 
  }

  checkAnotherByLocation(location){
    const data={
      location: location
    }
    return this.http.post(`${this.uri}/checkAnotherByLocation`, data); 
  }

  getFinishedCompetitions(){
    return this.http.get(`${this.uri}/getFinishedCompetitions`);
  }

}
