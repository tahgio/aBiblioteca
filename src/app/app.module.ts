import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroChevronDoubleUpSolid,
  heroChevronDoubleDownSolid,
  heroStarSolid,
  heroXCircleSolid,
  heroPlusCircleSolid,
} from '@ng-icons/heroicons/solid';
import { heroStar } from '@ng-icons/heroicons/outline';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';
import { StarRatingComponent } from './elements/star-rating/star-rating.component';
import { AddFormComponent } from './elements/add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdicionarComponent,
    StarRatingComponent,
    AddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroChevronDoubleUpSolid,
      heroChevronDoubleDownSolid,
      heroStar,
      heroStarSolid,
      heroXCircleSolid,
      heroPlusCircleSolid,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
