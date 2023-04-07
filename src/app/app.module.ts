import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroChevronDoubleUpSolid,
  heroChevronDoubleDownSolid,
} from '@ng-icons/heroicons/solid';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, AdicionarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({
      heroChevronDoubleUpSolid,
      heroChevronDoubleDownSolid,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
