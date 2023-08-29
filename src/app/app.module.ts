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
  heroFolderPlusSolid,
  heroPencilSquareSolid,
} from '@ng-icons/heroicons/solid';
import {
  heroStar,
  heroCheckCircle,
  heroInformationCircle,
  heroExclamationCircle,
  heroExclamationTriangle,
} from '@ng-icons/heroicons/outline';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';
import { StarRatingComponent } from './elements/star-rating/star-rating.component';
import { AddFormComponent } from './elements/add-form/add-form.component';
import { ToastComponent } from './elements/toast/toast.component';
import { MessageService } from './core/services/message/message.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LivrosComponent } from './pages/livros/livros.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { HoverInfoDirective } from './core/directives/hover-info/hover-info.directive';
import { TagPipe } from './core/pipes/tag.pipe';
import { SingleComponent } from './pages/single/single.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdicionarComponent,
    StarRatingComponent,
    AddFormComponent,
    ToastComponent,
    LivrosComponent,
    FilmesComponent,
    AlbumsComponent,
    HoverInfoDirective,
    TagPipe,
    SingleComponent,
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
      heroCheckCircle,
      heroInformationCircle,
      heroExclamationCircle,
      heroExclamationTriangle,
      heroFolderPlusSolid,
      heroPencilSquareSolid,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
