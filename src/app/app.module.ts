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
  heroXMarkSolid,
  heroPlusCircleSolid,
  heroFolderPlusSolid,
  heroPencilSquareSolid,
  heroBookOpenSolid,
  heroFilmSolid,
  heroPlusSolid,
  heroArrowPathSolid,
} from '@ng-icons/heroicons/solid';
import {
  heroStar,
  heroCheckCircle,
  heroInformationCircle,
  heroExclamationCircle,
  heroExclamationTriangle,
} from '@ng-icons/heroicons/outline';
import {
  heroPlusCircleMini,
  heroPencilSquareMini,
  heroPencilMini,
} from '@ng-icons/heroicons/mini';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';
import { StarRatingComponent } from './elements/star-rating/star-rating.component';
import { AddFormComponent } from './elements/add-form/add-form.component';
import { ToastComponent } from './elements/toast/toast.component';
import { MessageService } from './core/services/message/message.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HoverInfoDirective } from './core/directives/hover-info/hover-info.directive';
import { TagPipe } from './core/pipes/tag.pipe';
import { SingleComponent } from './pages/single/single.component';
import { AsPipe } from './core/pipes/as.pipe';
import { TooltipComponent } from './elements/tooltip/tooltip.component';
import { TooltipDirective } from './core/directives/tooltip/tooltip.directive';
import { ItemsComponent } from './pages/items/items.component';
import { HeaderComponent } from './elements/header/header.component';
import { SubCardsComponent } from './elements/sub-cards/sub-cards.component';
import { NotFoundComponent } from './elements/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdicionarComponent,
    StarRatingComponent,
    AddFormComponent,
    ToastComponent,
    HoverInfoDirective,
    TagPipe,
    SingleComponent,
    AsPipe,
    TooltipComponent,
    TooltipDirective,
    ItemsComponent,
    HeaderComponent,
    SubCardsComponent,
    NotFoundComponent,
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
      heroBookOpenSolid,
      heroFilmSolid,
      heroPlusCircleMini,
      heroPencilSquareMini,
      heroPencilMini,
      heroXMarkSolid,
      heroPlusSolid,
      heroArrowPathSolid,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
