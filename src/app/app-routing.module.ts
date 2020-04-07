import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TeamComponent } from './components/teams/team.component';
import { CreateTeamComponent } from './components/teams/create-team/create-team.component';
import { EditTeamComponent } from './components/teams/edit-team/edit-team.component';
import { AuthGuard } from './guards/auth.guard';

import { PlaceholderComponent } from './components/placeholder/placeholder.component';


const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'teams',
    component: TeamComponent,
    canActivate: [AuthGuard],
    children: [{ path: ':id', component: PlaceholderComponent }],
  },
  {
    path: 'create-team',
    component: CreateTeamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-team',
    component: EditTeamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fields',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    children: [{ path: ':id', component: PlaceholderComponent }],
  },
  {
    path: 'matches',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    children: [{ path: ':id', component: PlaceholderComponent }],
  },
  { path: '**', redirectTo: '/about' }, // PageNotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
