import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAthleteComponent } from './addAthlete/addathlete.component';
import { AddAthleteJSONComponent } from './addAthleteJson/addathletejson.component';
import { AddCompetitionComponent } from './addCompetition/addCompetition.component';
import { AddSportComponent } from './addSport/addsport.component';
import { ChangePasswordComponent } from './changePassword/changepassword.component';
import { CompetitionDelegateComponent } from './competitionDelegate/competitionDelegate.component';
import { CompetitionResultComponent } from './competitionResult/competitionresult.component';
import { CompetitionResultTennisComponent } from './competitionResultTennis/competitionresulttennis.component';
import { DateCompetitionComponent } from './dateCompetition/datecompetition.component';
import { FindAthleteComponent } from './findAthlete/findathlete.component';
import { HeadOfTheNationalDelegationComponent } from './headOfTheNationalDelegation/headofthenationaldelegation.component';
import { ListCountriesComponent } from './listCountries/listcountries.component';
import { ListMedalsComponent } from './listMedals/listmedals.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "organizer", component: OrganizerComponent},
  {path: "competitionDelegate", component: CompetitionDelegateComponent},
  {path: "headOfTheNationalDelegation", component: HeadOfTheNationalDelegationComponent},
  {path: "register", component : RegisterComponent},
  {path: "changePassword", component: ChangePasswordComponent},
  {path: "listCountries", component: ListCountriesComponent},
  {path: "listMedals", component: ListMedalsComponent},
  {path: "addSport", component: AddSportComponent},
  {path: "addAthlete", component: AddAthleteComponent},
  {path: "addAthleteJSON", component: AddAthleteJSONComponent},
  {path: "findAthlete", component: FindAthleteComponent},
  {path: "addCompetition", component: AddCompetitionComponent},
  {path: "dateCompetition", component: DateCompetitionComponent},
  {path: "competitionResult", component: CompetitionResultComponent},
  {path: "competitionResultTennis", component: CompetitionResultTennisComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
