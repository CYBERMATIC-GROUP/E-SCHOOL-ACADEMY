import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveFicheComponent } from './eleve-fiche.component';

describe('EleveFicheComponent', () => {
  let component: EleveFicheComponent;
  let fixture: ComponentFixture<EleveFicheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleveFicheComponent]
    });
    fixture = TestBed.createComponent(EleveFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
