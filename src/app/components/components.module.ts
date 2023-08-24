import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [ListComponent, PokemonDetailsComponent],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
