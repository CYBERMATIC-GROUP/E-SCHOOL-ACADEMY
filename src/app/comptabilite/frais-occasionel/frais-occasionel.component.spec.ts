import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisOccasionelComponent } from './frais-occasionel.component';

describe('FraisOccasionelComponent', () => {
  let component: FraisOccasionelComponent;
  let fixture: ComponentFixture<FraisOccasionelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraisOccasionelComponent]
    });
    fixture = TestBed.createComponent(FraisOccasionelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
