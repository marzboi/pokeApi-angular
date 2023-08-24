import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  pokemons: PokemonDetails[] | null = null;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.pokemonService.allPokemon$.subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  handleNavigaToDetails(id: number) {
    this.zone.run(() => this.router.navigate([`pokemon/${id}`]));
  }
}
