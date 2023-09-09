import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  faPoint = faHandPointRight;
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
    if (!this.form.value.search || this.form.value.search.includes(' ')) {
      Swal.fire({
        title: 'Hey!',
        text: 'Enter a valid ID or Name',
        icon: 'warning',
        confirmButtonText: 'Cool',
        toast: true,
        confirmButtonColor: '#fff01f',
        iconColor: '#fff01f',
      });
      return;
    }
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
