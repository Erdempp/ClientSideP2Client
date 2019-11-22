import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: 'about', component: AboutComponent },
  { path: 'register', component: PlaceholderComponent },
  { path: 'login', component: PlaceholderComponent },
  { path: 'teams', component: PlaceholderComponent, children: [{ path: ':id', component: PlaceholderComponent }] },
  { path: 'fields', component: PlaceholderComponent, children: [{ path: ':id', component: PlaceholderComponent }] },
  { path: 'competitions', component: PlaceholderComponent, children: [{ path: ':id', component: PlaceholderComponent }] },
  { path: '**', redirectTo: '/about', }, // PageNotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
