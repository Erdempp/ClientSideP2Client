import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent, AboutComponent, PlaceholderComponent, NavigationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [NavigationComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
