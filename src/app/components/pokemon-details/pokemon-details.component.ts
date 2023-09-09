import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails, Stat } from 'src/app/types/api-response';

interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
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
  pokemonStats: PokemonStats = {} as PokemonStats;
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
        if (this.pokemon) {
          this.getStatsFromPokemon(this.pokemon);
        }
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
      if (this.pokemon) {
        this.getStatsFromPokemon(this.pokemon);
      }
    });
  }

  loadNext() {
    this.loading = true;
    this.pokemonService.getSinglePokemonById(this.id + 1).subscribe(() => {
      this.pokemon = this.pokemonService.pokemon$.value;
      this.loading = false;
      this.id++;
      if (this.pokemon) {
        this.getStatsFromPokemon(this.pokemon);
      }
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

  getStaticSpriteUrl(item: PokemonDetails): string {
    return item.sprites.front_default || 'assets/default.png';
  }

  getStaticSpriteUrlBack(item: PokemonDetails): string {
    return item.sprites.back_default || 'assets/default.png';
  }

  getGifSpriteUrl(item: PokemonDetails): string {
    return (
      item.sprites.versions?.['generation-v']?.['black-white']?.animated
        ?.front_default || this.getStaticSpriteUrl(item)
    );
  }

  getStatsFromPokemon(item: PokemonDetails) {
    this.pokemonStats = {
      hp: item.stats[0].base_stat,
      attack: item.stats[1].base_stat,
      defense: item.stats[2].base_stat,
      special_attack: item.stats[3].base_stat,
      special_defense: item.stats[4].base_stat,
      speed: item.stats[5].base_stat,
    };
  }
}
