import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TeamsComponent } from './components/teams/teams.component';
import { CreateTeamComponent } from './components/teams/create-team/create-team.component';
import { EditTeamComponent } from './components/teams/edit-team/edit-team.component';
import { FieldsComponent } from './components/fields/fields.component';
import { CreateFieldComponent } from './components/fields/create-field/create-field.component';
import { EditFieldComponent } from './components/fields/edit-field/edit-field.component';
import { FieldDetailsComponent } from './components/fields/field-details/field-details.component';

import { PlaceholderComponent } from './components/placeholder/placeholder.component';


const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'teams',
    component: TeamsComponent,
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
    component: FieldsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fields/:id',
    component: FieldDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-field',
    component: CreateFieldComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-field',
    component: EditFieldComponent,
    canActivate: [AuthGuard]
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
