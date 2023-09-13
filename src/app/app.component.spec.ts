import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BehaviorSubject, map, of } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
import { Router } from '@angular/router';
import { PokemonDetails } from './types/api-response';

describe('AppComponent', () => {
  let routerMock: { navigate: jasmine.Spy };
  const pokemonServiceMock = {
    getPokemons: jasmine
      .createSpy('getPokemons')
      .and.returnValue(of(null).pipe(map(() => {}))),
    pokemonsList$: new BehaviorSubject<PokemonDetails[]>([]),
    pokemon$: new BehaviorSubject<PokemonDetails | null>(null),
  };

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        HttpClientModule,
        ComponentsModule,
        BrowserAnimationsModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pokeApi'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pokeApi');
  });

  it('should navigate to "loading" and then the Main List on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith(['loading']);
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    expect(pokemonServiceMock.getPokemons).toHaveBeenCalled();
  });
});
