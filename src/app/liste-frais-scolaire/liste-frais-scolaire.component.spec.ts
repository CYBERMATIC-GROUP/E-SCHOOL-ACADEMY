import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFraisScolaireComponent } from './liste-frais-scolaire.component';

describe('ListeFraisScolaireComponent', () => {
  let component: ListeFraisScolaireComponent;
  let fixture: ComponentFixture<ListeFraisScolaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeFraisScolaireComponent]
    });
    fixture = TestBed.createComponent(ListeFraisScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
