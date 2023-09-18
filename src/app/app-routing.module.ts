import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdicionarComponent } from './pages/adicionar/adicionar.component';
import { SingleComponent } from './pages/single/single.component';
import { ItemsComponent } from './pages/items/items.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adicionar', component: AdicionarComponent },
  { path: 'livros', component: ItemsComponent },
  { path: 'livros/:itemId', component: SingleComponent },
  { path: 'filmes', component: ItemsComponent },
  { path: 'filmes/:itemId', component: SingleComponent },
  { path: 'albums', component: ItemsComponent },
  { path: 'albums/:itemId', component: SingleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
