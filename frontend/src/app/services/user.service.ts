import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  loginToTheSystem(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/loginToTheSystem`, data);
  }

  register(name, surname, email, username, password, country, userType){
    const data={
      username : username,
      password : password,
      name : name,
      surname : surname,
      country : country,
      email : email,
      userType : userType
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  findUsername(username){
    const data={
      username: username
    }

    return this.http.post(`${this.uri}/findUsername`, data);
  }

  changePassword(username, newPassword){
    const data={
      username: username,
      newPassword: newPassword
    }
    return this.http.post(`${this.uri}/changePassword`, data);
  }

  getAllDelegates(){
    return this.http.get(`${this.uri}/getAllDelegates`);
  }

  checkDelegate(delegate){
    const data={
      username: delegate
    }

    return this.http.post(`${this.uri}/checkDelegate`, data);
  }

  checkNationalDelegation(ut, c){
    const data={
      userType: ut,
      country: c
    }
    return this.http.post(`${this.uri}/checkNationalDelegation`, data);
  }
}
