import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRetraitsCaissesComponent } from './historique-retraits-caisses.component';

describe('HistoriqueRetraitsCaissesComponent', () => {
  let component: HistoriqueRetraitsCaissesComponent;
  let fixture: ComponentFixture<HistoriqueRetraitsCaissesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueRetraitsCaissesComponent]
    });
    fixture = TestBed.createComponent(HistoriqueRetraitsCaissesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
