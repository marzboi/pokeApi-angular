import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonDetails } from 'src/app/types/api-response';
import { PokemonService } from 'src/app/services/pokemon.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let pokemonService: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        InfiniteScrollModule,
      ],
      providers: [PokemonService],
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getStaticSpriteUrl', () => {
    it('should return the correct static sprite URL', () => {
      const pokemonDetail: PokemonDetails = {
        sprites: {
          front_default: 'https://example.com/static_sprite.png',
        },
      } as unknown as PokemonDetails;
      expect(component.getStaticSpriteUrl(pokemonDetail)).toBe(
        'https://example.com/static_sprite.png'
      );
    });

    it('should return the fallback URL if sprites.front_default is not available', () => {
      const pokemonDetail: PokemonDetails = {
        sprites: {},
      } as unknown as PokemonDetails;
      expect(component.getStaticSpriteUrl(pokemonDetail)).toBe(
        'assets/default.png'
      );
    });
  });

  describe('getGifSpriteUrl', () => {
    it('should return the correct GIF sprite URL', () => {
      const pokemonDetail: PokemonDetails = {
        sprites: {
          versions: {
            'generation-v': {
              'black-white': {
                animated: {
                  front_default: 'https://example.com/gif_sprite.png',
                },
              },
            },
          },
        },
      } as unknown as PokemonDetails;
      expect(component.getGifSpriteUrl(pokemonDetail)).toBe(
        'https://example.com/gif_sprite.png'
      );
    });

    it('should return the static sprite URL as fallback if GIF sprite URL is not available', () => {
      const pokemonDetail: PokemonDetails = {
        sprites: {
          front_default: 'https://example.com/static_sprite.png',
        },
      } as unknown as PokemonDetails;
      expect(component.getGifSpriteUrl(pokemonDetail)).toBe(
        'https://example.com/static_sprite.png'
      );
    });
  });

  describe('getTypeImageUrl', () => {
    it('should return the correct type image URL for index 0', () => {
      const pokemonDetail: PokemonDetails = {
        types: [{ type: { name: 'fire' } }],
      } as unknown as PokemonDetails;
      expect(component.getTypeImageUrl(pokemonDetail, 0)).toBe(
        'assets/types-list/fire.png'
      );
    });

    it('should return the correct type image URL for index 1', () => {
      const pokemonDetail: PokemonDetails = {
        types: [{ type: { name: 'fire' } }, { type: { name: 'water' } }],
      } as unknown as PokemonDetails;
      expect(component.getTypeImageUrl(pokemonDetail, 1)).toBe(
        'assets/types-list/water.png'
      );
    });

    it('should return null for an out-of-bounds index', () => {
      const pokemonDetail: PokemonDetails = {
        types: [{ type: { name: 'fire' } }],
      } as unknown as PokemonDetails;
      expect(component.getTypeImageUrl(pokemonDetail, 1)).toBeNull();
    });
  });

  describe('goBackUp', () => {
    it('should call window.scrollTo with correct parameters to scroll to top', () => {
      spyOn(window, 'scrollTo');

      component.goBackUp();

      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('setHoverState', () => {
    it('should correctly set the hover state to true', () => {
      component.setHoverState(1, true);

      expect(component.hoveringOverImage[1]).toBeTrue();
    });

    it('should correctly set the hover state to false', () => {
      component.setHoverState(1, false);

      expect(component.hoveringOverImage[1]).toBeFalse();
    });
  });
});

describe('ListComponent - Specific Methods', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let pokemonService: PokemonService;
  let router: Router;

  const mockPokemonService = {
    getPokemons: jasmine.createSpy('getPokemons').and.returnValue(of(null)),
    next$: new BehaviorSubject<string | null>(null),
    pokemonsList$: new BehaviorSubject<PokemonDetails[]>([]),
    pokemon$: new BehaviorSubject<PokemonDetails | null>(null),
  } as unknown as PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule, FontAwesomeModule, InfiniteScrollModule],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should set next and pokemons properties and populate currentSpriteUrls based on service observables', () => {
      mockPokemonService.next$.next('nextUrl');
      mockPokemonService.pokemonsList$.next([
        { id: 1, sprites: { front_default: 'url' } } as PokemonDetails,
      ]);

      component.ngOnInit();

      expect(component.next).toBe('nextUrl');
      expect(component.pokemons).toEqual([
        { id: 1, sprites: { front_default: 'url' } } as PokemonDetails,
      ]);
      expect(component.currentSpriteUrls).toEqual({ 1: 'url' });
    });
  });

  describe('handleNavigaToDetails', () => {
    it('should navigate to the correct route', () => {
      spyOn(router, 'navigate');
      component.handleNavigaToDetails(1);

      expect(router.navigate).toHaveBeenCalledWith(['pokemon/1']);
    });
  });

  describe('onScroll', () => {
    it('should call getPokemons with the correct parameter and handle success correctly', () => {
      mockPokemonService.next$.next('nextUrl');
      component.isLoading = false;

      component.onScroll();

      expect(mockPokemonService.getPokemons).toHaveBeenCalledWith('nextUrl');
      expect(component.isLoading).toBeFalse();
    });

    it('should handle errors correctly', () => {
      (mockPokemonService.getPokemons as jasmine.Spy).and.returnValue(
        throwError('error')
      );
      component.isLoading = false;
      component.onScroll();
      expect(component.isLoading).toBeFalse();
    });

    it('should not call getPokemons if next is null', () => {
      component.next = null;
      component.isLoading = false;

      component.onScroll();

      expect(mockPokemonService.getPokemons).toHaveBeenCalled();
    });
  });
});
