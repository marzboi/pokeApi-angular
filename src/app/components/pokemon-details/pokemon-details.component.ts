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
  }

  loadPrevious() {
    this.loading = true;
    this.pokemonService.getSinglePokemonById(this.id - 1).subscribe(() => {
      this.pokemon = this.pokemonService.pokemon$.value;
      this.loading = false;
      this.id--;
      console.log(this.id);
    });
  }

  loadNext() {
    this.loading = true;
    this.pokemonService.getSinglePokemonById(this.id + 1).subscribe(() => {
      this.pokemon = this.pokemonService.pokemon$.value;
      this.loading = false;
      this.id++;
      console.log(this.id);
    });
  }

  handleNavigateHome() {
    this.zone.run(() => this.router.navigate(['']));
  }
}
