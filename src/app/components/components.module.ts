import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [ListComponent, PokemonDetailsComponent, LoadingComponent, ErrorComponent],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
