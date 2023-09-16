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
import { NgZone } from '@angular/core';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve(true)),
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

  describe('ngOnInit', () => {
    it('should set pokemon details correctly based on the route parameter', () => {
      const mockPokemonDetails: PokemonDetails = {
        id: 1,
        name: 'test',
        sprites: {
          front_default: 'test_url',
          back_default: 'test_url_back',
          versions: {
            'generation-v': {
              'black-white': {
                animated: {
                  front_default: 'test_url_gif',
                },
              },
            },
          },
        },
        stats: [
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
        ],
        types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
      } as PokemonDetails;

      const pokemonService = TestBed.inject(PokemonService);
      (pokemonService.getSinglePokemonById as jasmine.Spy).and.returnValue(
        of(mockPokemonDetails)
      );
      pokemonService.pokemon$.next(mockPokemonDetails);

      component.ngOnInit();

      expect(component.pokemon).toEqual(mockPokemonDetails);
      expect(component.pokemonStats).toEqual({
        hp: 100,
        attack: 100,
        defense: 100,
        special_attack: 100,
        special_defense: 100,
        speed: 100,
      });
      expect(component.pokemonType).toEqual({
        type_1: 'type1',
        type_2: 'type2',
      });
      expect(component.pokemonImages).toEqual([
        'test_url',
        'test_url_back',
        'test_url_gif',
      ]);
      expect(component.loading).toBeFalse();
    });
  });

  describe('loadPrevious', () => {
    it('should load previous pokemon details correctly', () => {
      const mockPokemonDetails: PokemonDetails = {
        id: 1,
        name: 'test',
        sprites: {
          front_default: 'test_url',
          back_default: 'test_url_back',
          versions: {
            'generation-v': {
              'black-white': {
                animated: {
                  front_default: 'test_url_gif',
                },
              },
            },
          },
        },
        stats: [
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
        ],
        types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
      } as PokemonDetails;

      component.id = 2;

      const pokemonService = TestBed.inject(PokemonService);
      (pokemonService.getSinglePokemonById as jasmine.Spy).and.returnValue(
        of(mockPokemonDetails)
      );
      pokemonService.pokemon$.next(mockPokemonDetails);

      component.loadPrevious();

      expect(component.loading).toBeFalse();
      expect(component.id).toEqual(1);
      expect(component.pokemon).toEqual(mockPokemonDetails);
      expect(component.pokemonStats).toEqual({
        hp: 100,
        attack: 100,
        defense: 100,
        special_attack: 100,
        special_defense: 100,
        speed: 100,
      });
      expect(component.pokemonType).toEqual({
        type_1: 'type1',
        type_2: 'type2',
      });
      expect(component.pokemonImages).toEqual([
        'test_url',
        'test_url_back',
        'test_url_gif',
      ]);
    });
  });

  describe('loadNext', () => {
    it('should load next pokemon details correctly', () => {
      const mockPokemonDetails: PokemonDetails = {
        id: 3,
        name: 'test',
        sprites: {
          front_default: 'test_url',
          back_default: 'test_url_back',
          versions: {
            'generation-v': {
              'black-white': {
                animated: {
                  front_default: 'test_url_gif',
                },
              },
            },
          },
        },
        stats: [
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
          { base_stat: 100 },
        ],
        types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
      } as PokemonDetails;

      component.id = 2;

      const pokemonService = TestBed.inject(PokemonService);
      (pokemonService.getSinglePokemonById as jasmine.Spy).and.returnValue(
        of(mockPokemonDetails)
      );
      pokemonService.pokemon$.next(mockPokemonDetails);

      component.loadNext();

      expect(component.loading).toBeFalse();
      expect(component.id).toEqual(3);
      expect(component.pokemon).toEqual(mockPokemonDetails);
      expect(component.pokemonStats).toEqual({
        hp: 100,
        attack: 100,
        defense: 100,
        special_attack: 100,
        special_defense: 100,
        speed: 100,
      });
      expect(component.pokemonType).toEqual({
        type_1: 'type1',
        type_2: 'type2',
      });
      expect(component.pokemonImages).toEqual([
        'test_url',
        'test_url_back',
        'test_url_gif',
      ]);
    });
  });

  describe('handleNavigateHome', () => {
    it('should navigate to home and scroll to the current pokemon', () => {
      const mockPokemons: PokemonDetails[] = [
        { id: 1, name: 'bulbasaur' } as PokemonDetails,
        { id: 2, name: 'ivysaur' } as PokemonDetails,
        { id: 3, name: 'venusaur' } as PokemonDetails,
      ];

      const pokemonService = TestBed.inject(PokemonService);
      pokemonService.pokemonsList$.next(mockPokemons);

      component.id = 2;
      spyOn(component, 'scrollToPokemon');

      const zone = TestBed.inject(NgZone);
      spyOn(zone, 'run').and.callFake((fn: Function) => fn());

      component.handleNavigateHome();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });
  });

  describe('nextImage', () => {
    it('should increment currentImageIndex if it is less than the length of pokemonImages array - 1', () => {
      component.pokemonImages = ['url1', 'url2', 'url3'];
      component.currentImageIndex = 1;

      component.nextImage();

      expect(component.currentImageIndex).toBe(2);
    });

    it('should not increment currentImageIndex if it is equal to the length of pokemonImages array - 1', () => {
      component.pokemonImages = ['url1', 'url2', 'url3'];
      component.currentImageIndex = 2;

      component.nextImage();

      expect(component.currentImageIndex).toBe(2);
    });
  });

  describe('prevImage', () => {
    it('should decrement currentImageIndex if it is greater than 0', () => {
      component.pokemonImages = ['url1', 'url2', 'url3'];
      component.currentImageIndex = 1;

      component.prevImage();

      expect(component.currentImageIndex).toBe(0);
    });

    it('should not decrement currentImageIndex if it is equal to 0', () => {
      component.pokemonImages = ['url1', 'url2', 'url3'];
      component.currentImageIndex = 0;

      component.prevImage();

      expect(component.currentImageIndex).toBe(0);
    });
  });

  describe('PokemonDetailsComponent > Image URL methods', () => {
    let mockPokemonDetails: PokemonDetails;

    beforeEach(() => {
      mockPokemonDetails = {
        sprites: {
          front_default: 'front_default_url',
          back_default: 'back_default_url',
          versions: {
            'generation-v': {
              'black-white': {
                animated: {
                  front_default: 'front_default_gif_url',
                },
              },
            },
          },
        },
      } as PokemonDetails;
    });

    describe('getStaticSpriteUrl', () => {
      it('should return the correct URL if it is present in the PokemonDetails object', () => {
        const url = component.getStaticSpriteUrl(mockPokemonDetails);
        expect(url).toBe('front_default_url');
      });

      it('should return the default URL if it is not present in the PokemonDetails object', () => {
        mockPokemonDetails.sprites.front_default = undefined;
        const url = component.getStaticSpriteUrl(mockPokemonDetails);
        expect(url).toBe('assets/default.png');
      });
    });

    describe('getStaticSpriteUrlBack', () => {
      it('should return the correct URL if it is present in the PokemonDetails object', () => {
        const url = component.getStaticSpriteUrlBack(mockPokemonDetails);
        expect(url).toBe('back_default_url');
      });

      it('should return the default URL if it is not present in the PokemonDetails object', () => {
        mockPokemonDetails.sprites.back_default = undefined;
        const url = component.getStaticSpriteUrlBack(mockPokemonDetails);
        expect(url).toBe('assets/default.png');
      });
    });

    describe('getGifSpriteUrl', () => {
      it('should return the correct URL if it is present in the PokemonDetails object', () => {
        const url = component.getGifSpriteUrl(mockPokemonDetails);
        expect(url).toBe('front_default_gif_url');
      });

      it('should return the default URL if it is not present in the PokemonDetails object', () => {
        mockPokemonDetails.sprites.versions['generation-v'][
          'black-white'
        ].animated.front_default = undefined;
        const url = component.getGifSpriteUrl(mockPokemonDetails);
        expect(url).toBe('assets/default.png');
      });
    });
  });
});
