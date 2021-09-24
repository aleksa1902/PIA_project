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
import { CompetitionResultComponent } from './competitionResult/competitionresult.component';
import { CompetitionResultTennisComponent } from './competitionResultTennis/competitionresulttennis.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
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
    DateCompetitionComponent,
    CompetitionResultComponent,
    CompetitionResultTennisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }