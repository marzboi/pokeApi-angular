import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails, PokemonType } from 'src/app/types/api-response';
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
  hoveringOverImage: { [key: number]: boolean } = {};
  pokemonType: PokemonType = {} as PokemonType;
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
    return item.sprites.front_default || 'assets/default.png';
  }

  getGifSpriteUrl(item: PokemonDetails): string {
    return (
      item.sprites.versions?.['generation-v']?.['black-white']?.animated
        ?.front_default || this.getStaticSpriteUrl(item)
    );
  }

  goBackUp() {
    window.scrollTo(0, 0);
  }

  setHoverState(id: number, isHovering: boolean) {
    this.hoveringOverImage[id] = isHovering;
  }

  getTypeImageUrl(item: PokemonDetails, index: number): string | null {
    return item.types[index]?.type.name
      ? 'assets/types-list/' + item.types[index]?.type.name + '.png'
      : null;
  }
}
