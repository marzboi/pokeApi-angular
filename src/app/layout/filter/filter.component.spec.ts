import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterComponent } from './filter.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let pokemonServiceMock: jasmine.SpyObj<PokemonService>;
  let routerMock: { navigate: jasmine.Spy };

  beforeEach(() => {
    pokemonServiceMock = jasmine.createSpyObj('PokemonService', [
      'resetPokemonList',
      'getPokemonByType',
    ]);
    pokemonServiceMock.resetPokemonList.and.returnValue(of(void 0));
    pokemonServiceMock.getPokemonByType.and.returnValue(of(void 0));

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a type of 0', () => {
    expect(component.type).toBe(0);
  });

  describe('handlePokemonByType', () => {
    it('should navigate to loading and then home when type is 0', () => {
      component.handlePokemonByType();
      expect(routerMock.navigate).toHaveBeenCalledWith(['loading']);
      expect(routerMock.navigate).toHaveBeenCalledWith(['']);
      expect(pokemonServiceMock.resetPokemonList).toHaveBeenCalled();
    });

    it('should navigate to loading and then home when type is non-zero', () => {
      component.type = 1;
      component.handlePokemonByType();
      expect(routerMock.navigate).toHaveBeenCalledWith(['loading']);
      expect(routerMock.navigate).toHaveBeenCalledWith(['']);
      expect(pokemonServiceMock.getPokemonByType).toHaveBeenCalledWith(1);
    });
  });
});
