import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: 'loading', component: LoadingComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
