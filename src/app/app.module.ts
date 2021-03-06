import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TeamsComponent } from './components/teams/teams.component';
import { CreateTeamComponent } from './components/teams/create-team/create-team.component';
import { EditTeamComponent } from './components/teams/edit-team/edit-team.component';
import { FieldsComponent } from './components/fields/fields.component';
import { CreateFieldComponent } from './components/fields/create-field/create-field.component';
import { EditFieldComponent } from './components/fields/edit-field/edit-field.component';
import { FieldDetailsComponent } from './components/fields/field-details/field-details.component';
import { FacilityDialogComponent } from './components/fields/field-details/facility-dialog/facility-dialog.component';
import { TeamDetailsComponent } from './components/teams/team-details/team-details.component';
import { PlayerDialogComponent } from './components/teams/team-details/player-dialog/player-dialog.component';
import { MatchesComponent } from './components/matches/matches.component';
import { CreateMatchComponent } from './components/matches/create-match/create-match.component';
import { EditMatchComponent } from './components/matches/edit-match/edit-match.component';
import { MatchDetailsComponent } from './components/matches/match-details/match-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    TeamsComponent,
    CreateTeamComponent,
    EditTeamComponent,
    FieldsComponent,
    CreateFieldComponent,
    EditFieldComponent,
    FieldDetailsComponent,
    FacilityDialogComponent,
    TeamDetailsComponent,
    PlayerDialogComponent,
    MatchesComponent,
    CreateMatchComponent,
    EditMatchComponent,
    MatchDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [NavigationComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
