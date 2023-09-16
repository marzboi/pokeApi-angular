import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { ApiResponse, PokemonDetails } from '../types/api-response';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pokemons', () => {
    const mockApiResponse = {
      results: [{ url: 'pokemon1' }, { url: 'pokemon2' }],
      next: 'next',
    };
    const mockDetails1 = { id: 1, name: 'pokemon1' };
    const mockDetails2 = { id: 2, name: 'pokemon2' };

    service.getPokemons().subscribe();

    const req = httpMock.expectOne(service.url + 'pokemon?limit=40&offset=0');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

    const detailReq1 = httpMock.expectOne('pokemon1');
    expect(detailReq1.request.method).toBe('GET');
    detailReq1.flush(mockDetails1);

    const detailReq2 = httpMock.expectOne('pokemon2');
    expect(detailReq2.request.method).toBe('GET');
    detailReq2.flush(mockDetails2);
  });

  it('should get single pokemon by id', () => {
    const id = 1;
    service.getSinglePokemonById(id).subscribe();

    const req = httpMock.expectOne(service.url + 'pokemon/' + id);
    expect(req.request.method).toBe('GET');

    req.flush({} as PokemonDetails);
  });

  it('should get pokemon by type', () => {
    const mockApiResponseType = {
      pokemon: [
        { pokemon: { url: 'pokemon1' } },
        { pokemon: { url: 'pokemon2' } },
      ],
    };
    const mockDetails1 = { id: 1, name: 'pokemon1' };
    const mockDetails2 = { id: 2, name: 'pokemon2' };

    service.getPokemonByType(1).subscribe();

    const req = httpMock.expectOne(service.url + 'type/' + 1);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponseType);

    const detailReq1 = httpMock.expectOne('pokemon1');
    expect(detailReq1.request.method).toBe('GET');
    detailReq1.flush(mockDetails1);

    const detailReq2 = httpMock.expectOne('pokemon2');
    expect(detailReq2.request.method).toBe('GET');
    detailReq2.flush(mockDetails2);
  });

  it('should reset pokemon list', () => {
    const mockApiResponse = {
      results: [{ url: 'pokemon1' }, { url: 'pokemon2' }],
      next: 'next',
    };
    const mockDetails1 = { id: 1, name: 'pokemon1' };
    const mockDetails2 = { id: 2, name: 'pokemon2' };

    service.resetPokemonList().subscribe();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

    const detailReq1 = httpMock.expectOne('pokemon1');
    expect(detailReq1.request.method).toBe('GET');
    detailReq1.flush(mockDetails1);

    const detailReq2 = httpMock.expectOne('pokemon2');
    expect(detailReq2.request.method).toBe('GET');
    detailReq2.flush(mockDetails2);
  });

  it('should jump to pokemon', () => {
    const mockApiResponse = {
      results: [{ url: 'pokemon1' }, { url: 'pokemon2' }],
      next: 'next',
    };
    const mockDetails1 = { id: 1, name: 'pokemon1' };
    const mockDetails2 = { id: 2, name: 'pokemon2' };

    const id = 1;
    service.jumpToPokemon(id).subscribe();

    const req = httpMock.expectOne(
      service.url + `pokemon?limit=40&offset=${id - 1}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

    const detailReq1 = httpMock.expectOne('pokemon1');
    expect(detailReq1.request.method).toBe('GET');
    detailReq1.flush(mockDetails1);

    const detailReq2 = httpMock.expectOne('pokemon2');
    expect(detailReq2.request.method).toBe('GET');
    detailReq2.flush(mockDetails2);
  });

  it('The getPokemon method should use the passed URL when a URL is passed', () => {
    const customUrl = 'https://not-the-original-url-hehe/api';
    service.getPokemons(customUrl).subscribe();

    const req = httpMock.expectOne(customUrl);
    expect(req.request.method).toBe('GET');
  });
});
