import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JumpToComponent } from './jump-to.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('JumpToComponent', () => {
  let component: JumpToComponent;
  let fixture: ComponentFixture<JumpToComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JumpToComponent],
      imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule],
      providers: [
        {
          provide: PokemonService,
          useValue: jasmine.createSpyObj('PokemonService', ['getPokemonList']),
        },
      ],
    });
    fixture = TestBed.createComponent(JumpToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
