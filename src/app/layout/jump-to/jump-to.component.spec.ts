import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpToComponent } from './jump-to.component';

describe('JumpToComponent', () => {
  let component: JumpToComponent;
  let fixture: ComponentFixture<JumpToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JumpToComponent]
    });
    fixture = TestBed.createComponent(JumpToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
