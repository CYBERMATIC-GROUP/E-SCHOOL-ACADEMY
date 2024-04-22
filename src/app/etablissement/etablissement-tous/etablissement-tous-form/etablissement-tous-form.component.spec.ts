import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementTousFormComponent } from './etablissement-tous-form.component';

describe('EtablissementTousFormComponent', () => {
  let component: EtablissementTousFormComponent;
  let fixture: ComponentFixture<EtablissementTousFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtablissementTousFormComponent]
    });
    fixture = TestBed.createComponent(EtablissementTousFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
