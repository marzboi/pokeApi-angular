import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { PokemonDetails } from 'src/app/types/api-response';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    const mockPokemonService = {
      getSinglePokemonById: jasmine
        .createSpy('getSinglePokemonById')
        .and.returnValue(of({} as PokemonDetails)),
      pokemonsList$: new BehaviorSubject<PokemonDetails[]>([]),
      pokemon$: new BehaviorSubject<PokemonDetails | null>(null),
    } as unknown as PokemonService;

    TestBed.configureTestingModule({
      declarations: [PokemonDetailsComponent],
      imports: [
        InfiniteScrollModule,
        FormsModule,
        MatIconModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: PokemonService,
          useValue: mockPokemonService,
        },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
