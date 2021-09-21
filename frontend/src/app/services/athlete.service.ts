import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addAthlete(name, surname, country, gender, discipline){
    const data={
      name: name,
      surname: surname,
      country: country,
      gender: gender,
      disciplines: [discipline]
    }
    console.log(data);
    return this.http.post(`${this.uri}/addAthlete`, data); 
  }

  findAthlete(name, surname){
    const data={
      name: name,
      surname: surname
    }

    return this.http.post(`${this.uri}/findAthlete`, data); 
  }
  
  addDiscipline(name, surname, discipline){
    const data={
      name: name,
      surname: surname,
      discipline: discipline
    }
    
    return this.http.post(`${this.uri}/addDiscipline`, data); 
  }

  getAllAthletes(){
    return this.http.get(`${this.uri}/getAllAthletes`);
  }

  getAthleteByName(name){
    const data={
      name: name
    }
    return this.http.post(`${this.uri}/getAthleteByName`, data); 
  }

  getAthleteBySurname(surname){
    const data={
      surname: surname
    }
    return this.http.post(`${this.uri}/getAthleteBySurname`, data); 
  }

  getAthleteByNameSurname(name, surname){
    const data={
      name: name,
      surname: surname
    }
    return this.http.post(`${this.uri}/getAthleteByNameSurname`, data); 
  }

  getAthleteBySport(sport){
    const data={
      sport: sport
    }
    return this.http.post(`${this.uri}/getAthleteBySport`, data); 
  }

  getAthleteByNameSport(name, sport){
    const data={
      name: name,
      sport: sport
    }
    return this.http.post(`${this.uri}/getAthleteByNameSport`, data); 
  }

  getAthleteBySurnameSport(surname, sport){
    const data={
      surname: surname,
      sport: sport
    }
    return this.http.post(`${this.uri}/getAthleteBySurnameSport`, data); 
  }

  getAthleteByNameSurnameSport(name, surname, sport){
    const data={
      name: name,
      surname: surname,
      sport: sport
    }
    return this.http.post(`${this.uri}/getAthleteByNameSurnameSport`, data); 
  }

  getAthleteBySportGender(sport, gender){
    const data={
      sport: sport,
      gender: gender
    }
    return this.http.post(`${this.uri}/getAthleteBySportGender`, data); 
  }

  competitionStart(sportName, discipline){
    const data={
      sport: sportName,
      discipline: discipline
    }
    return this.http.post(`${this.uri}/competitionStart`, data);
  }

}
