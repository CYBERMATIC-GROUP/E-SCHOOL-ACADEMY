import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementTousComponent } from './etablissement-tous.component';

describe('EtablissementTousComponent', () => {
  let component: EtablissementTousComponent;
  let fixture: ComponentFixture<EtablissementTousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtablissementTousComponent]
    });
    fixture = TestBed.createComponent(EtablissementTousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
