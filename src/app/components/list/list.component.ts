import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  pokemons: PokemonDetails[] = [];
  next: string | null = null;
  isLoading: boolean = false;
  currentSpriteUrls: { [key: number]: string } = {};
  jumpToId: number | null = null;
  hoveringOverImage: { [key: number]: boolean } = {};
  public faHand = faHandPointUp;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.pokemonService.next$.subscribe((nextUrl) => {
      this.next = nextUrl;
    });
    this.pokemonService.pokemonsList$.subscribe((pokemons) => {
      this.pokemons = pokemons;
      this.pokemons.forEach((pokemon) => {
        this.currentSpriteUrls[pokemon.id] = this.getStaticSpriteUrl(pokemon);
      });
    });
  }

  handleNavigaToDetails(id: number) {
    this.zone.run(() => this.router.navigate([`pokemon/${id}`]));
  }

  onScroll() {
    if (!this.next || this.isLoading) return;
    this.isLoading = true;
    console.log('starting to load');
    this.pokemonService.getPokemons(this.next).subscribe(
      () => {
        console.log('Pokémon fetched successfully');
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching Pokémon:', error);
        this.isLoading = false;
      }
    );
  }

  getStaticSpriteUrl(item: PokemonDetails): string {
    return item.sprites.front_default || 'path/to/default/image.png';
  }

  getGifSpriteUrl(item: PokemonDetails): string {
    return (
      item.sprites.versions?.['generation-v']?.['black-white']?.animated
        ?.front_default || this.getStaticSpriteUrl(item)
    );
  }

  jumpToPokemon() {
    if (this.jumpToId !== null) {
      this.jumpToId < 1
        ? (this.jumpToId = 1)
        : this.jumpToId > 1010
        ? (this.jumpToId = 1010)
        : this.jumpToId;

      this.pokemonService.jumpToPokemon(this.jumpToId).subscribe(
        () => {},
        (error) => {
          console.error('Error fetching Pokémon:', error);
        }
      );
    }
  }

  goBackUp() {
    window.scrollTo(0, 0);
  }

  setHoverState(id: number, isHovering: boolean) {
    this.hoveringOverImage[id] = isHovering;
  }
}
