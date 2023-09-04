import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';
import { LivrosComponent } from './pages/livros/livros.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { SingleComponent } from './pages/single/single.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adicionar', component: AdicionarComponent },
  { path: 'livros', component: LivrosComponent },
  { path: 'livros/:itemId', component: SingleComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'albums', component: AlbumsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
