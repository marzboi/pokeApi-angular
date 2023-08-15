import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/types/api-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  pokemons: Pokemon[] | null = null;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.pokemons = this.pokemonService.allPokemon$.value;
    });
  }
}
