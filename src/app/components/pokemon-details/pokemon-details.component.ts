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
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pokemonService.getSinglePokemonDetail(params['id']).subscribe(() => {
        this.pokemon = this.pokemonService.pokemon$.value;
      });
    });
  }

  handleNavigateHome() {
    this.zone.run(() => this.router.navigate(['']));
  }
}
