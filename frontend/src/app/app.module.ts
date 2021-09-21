import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerComponent } from './organizer/organizer.component';
import { CompetitionDelegateComponent } from './competitionDelegate/competitionDelegate.component';
import { HeadOfTheNationalDelegationComponent } from './headOfTheNationalDelegation/headofthenationaldelegation.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './changePassword/changepassword.component';
import { ListCountriesComponent } from './listCountries/listcountries.component';
import { ListMedalsComponent } from './listMedals/listmedals.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'  
import { AddSportComponent } from './addSport/addsport.component';
import { AddAthleteComponent } from './addAthlete/addathlete.component';
import { AddAthleteJSONComponent } from './addAthleteJson/addathletejson.component';
import { FindAthleteComponent } from './findAthlete/findathlete.component';
import { AddCompetitionComponent } from './addCompetition/addCompetition.component';
import { DateCompetitionComponent } from './dateCompetition/datecompetition.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrganizerComponent,
    CompetitionDelegateComponent,
    HeadOfTheNationalDelegationComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ListCountriesComponent,
    ListMedalsComponent,
    AddSportComponent,
    AddAthleteComponent,
    AddAthleteJSONComponent,
    FindAthleteComponent,
    AddCompetitionComponent,
    DateCompetitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }