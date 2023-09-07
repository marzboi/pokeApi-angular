import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  form: FormGroup;
  pokemon: PokemonDetails | null = null;
  constructor(
    public formBuilder: FormBuilder,
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {
    this.form = formBuilder.group({
      search: ['', [Validators.required]],
    });
  }
  handlePokemonById() {
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService
      .getSinglePokemonById(this.form.value.search)
      .pipe(
        catchError(() => {
          this.zone.run(() => this.router.navigate(['error']));
          return [];
        })
      )
      .subscribe(() => {
        this.pokemon = this.pokemonService.pokemon$.value;
        this.zone.run(() =>
          this.router.navigate([`pokemon/${this.pokemon?.id}`])
        );
      });
  }
}
