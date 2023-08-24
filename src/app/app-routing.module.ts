import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
