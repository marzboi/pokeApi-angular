import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JumpToComponent } from './jump-to.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('JumpToComponent', () => {
  let component: JumpToComponent;
  let fixture: ComponentFixture<JumpToComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let swalSpy: jasmine.Spy;

  beforeEach(() => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'jumpToPokemon',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    swalSpy = spyOn(Swal, 'fire');

    TestBed.configureTestingModule({
      declarations: [JumpToComponent],
      imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(JumpToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate and fetch pokemon data when jumpToPokemon is called with valid id', () => {
    component.jumpToId = 5;
    mockPokemonService.jumpToPokemon.and.returnValue(of(void 0));
    component.jumpToPokemon();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['loading']);
    expect(mockPokemonService.jumpToPokemon).toHaveBeenCalledWith(5);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should show swal warning when jumpToPokemon is called with null id', () => {
    component.jumpToId = null;
    component.jumpToPokemon();

    expect(swalSpy).toHaveBeenCalled();
  });

  it('should handle error correctly when jumpToPokemon is called and service throws error', () => {
    component.jumpToId = 5;
    mockPokemonService.jumpToPokemon.and.returnValue(throwError('error'));
    component.jumpToPokemon();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should reset jumpToId to 1 if it is less than 1 when jumpToPokemon is called', () => {
    component.jumpToId = -5;
    mockPokemonService.jumpToPokemon.and.returnValue(of(void 0));
    component.jumpToPokemon();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['loading']);
    expect(mockPokemonService.jumpToPokemon).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should reset jumpToId to 1010 if it is greater than 1010 when jumpToPokemon is called', () => {
    component.jumpToId = 1015;
    mockPokemonService.jumpToPokemon.and.returnValue(of(void 0));
    component.jumpToPokemon();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['loading']);
    expect(mockPokemonService.jumpToPokemon).toHaveBeenCalledWith(1010);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
