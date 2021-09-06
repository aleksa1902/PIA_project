import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionDelegateComponent } from './competitionDelegate/competitionDelegate.component';
import { HeadOfTheNationalDelegationComponent } from './headOfTheNationalDelegation/headofthenationaldelegation.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "organizer", component: OrganizerComponent},
  {path: "competitionDelegate", component: CompetitionDelegateComponent},
  {path: "headOfTheNationalDelegation", component: HeadOfTheNationalDelegationComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
