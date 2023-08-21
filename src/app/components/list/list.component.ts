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
  next: string | null = null;
  previous: string | null = null;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(() => {
      this.pokemons = this.pokemonService.allPokemon$.value;
      this.next = this.pokemonService.next$.value;
      this.previous = this.pokemonService.previous$.value;
    });
  }
}
