import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'getSinglePokemonById',
    ]);
    mockPokemonService.pokemon$ = new BehaviorSubject({ id: 1 } as any);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show warning when search input is empty or contains space', () => {
    spyOn(Swal, 'fire');

    component.form.setValue({ search: '' });
    component.handlePokemonById();
    expect(Swal.fire).toHaveBeenCalled();

    component.form.setValue({ search: ' ' });
    component.handlePokemonById();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should navigate to pokemon detail page when pokemon retrieval is successful', () => {
    mockPokemonService.getSinglePokemonById.and.returnValue(of(void 0));

    component.form.setValue({ search: 'pikachu' });
    component.handlePokemonById();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['pokemon/1']);
  });

  it('should navigate to error page when pokemon retrieval fails', () => {
    mockPokemonService.getSinglePokemonById.and.returnValue(
      throwError('error')
    );

    component.form.setValue({ search: 'invalidname' });
    component.handlePokemonById();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['error']);
  });
});
