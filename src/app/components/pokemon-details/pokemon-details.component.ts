import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  params: Params = { id: '' };
  pokemon: PokemonDetails | null = null;
  loading: boolean = true;
  id: number = 0;
  pokemons: PokemonDetails[] = [];
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pokemonService.getSinglePokemonById(params['id']).subscribe(() => {
        this.id = Number(params['id']);
        this.pokemon = this.pokemonService.pokemon$.value;
        this.loading = false;
      });
    });
    this.pokemonService.pokemonsList$.subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  loadPrevious() {
    this.loading = true;
    this.pokemonService.getSinglePokemonById(this.id - 1).subscribe(() => {
      this.pokemon = this.pokemonService.pokemon$.value;
      this.loading = false;
      this.id--;
    });
  }

  loadNext() {
    this.loading = true;
    this.pokemonService.getSinglePokemonById(this.id + 1).subscribe(() => {
      this.pokemon = this.pokemonService.pokemon$.value;
      this.loading = false;
      this.id++;
    });
  }

  handleNavigateHome() {
    this.zone
      .run(() => this.router.navigate(['']))
      .then(() => {
        const index = this.pokemons.findIndex(
          (pokemon) => pokemon.id === this.id
        );
        this.scrollToPokemon(index);
      })
      .catch(() => {});
  }

  scrollToPokemon(index: number) {
    setTimeout(() => {
      if (this.pokemons.find((pokemon) => pokemon.id === index)) {
        const pokemonElement = document.getElementById(
          'pokemon-' + this.pokemons[index].id
        );
        pokemonElement?.scrollIntoView({ behavior: 'instant' });
      }
    }, 0);
  }
}
