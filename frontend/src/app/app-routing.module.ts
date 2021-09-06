import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionDelegateComponent } from './competitionDelegate/competitionDelegate.component';
import { HeadOfTheNationalDelegationComponent } from './headOfTheNationalDelegation/headofthenationaldelegation.component';
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
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
