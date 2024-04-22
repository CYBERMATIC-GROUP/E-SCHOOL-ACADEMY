import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEleveComponent } from './fiche-eleve.component';

describe('FicheEleveComponent', () => {
  let component: FicheEleveComponent;
  let fixture: ComponentFixture<FicheEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheEleveComponent]
    });
    fixture = TestBed.createComponent(FicheEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
