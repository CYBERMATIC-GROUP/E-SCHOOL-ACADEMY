import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveInscriptionComponent } from './eleve-inscription.component';

describe('EleveInscriptionComponent', () => {
  let component: EleveInscriptionComponent;
  let fixture: ComponentFixture<EleveInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleveInscriptionComponent]
    });
    fixture = TestBed.createComponent(EleveInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
