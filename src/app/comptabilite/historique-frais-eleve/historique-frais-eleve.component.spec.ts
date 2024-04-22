import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueFraisEleveComponent } from './historique-frais-eleve.component';

describe('HistoriqueFraisEleveComponent', () => {
  let component: HistoriqueFraisEleveComponent;
  let fixture: ComponentFixture<HistoriqueFraisEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueFraisEleveComponent]
    });
    fixture = TestBed.createComponent(HistoriqueFraisEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
