import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMatiereAjoutComponent } from './config-matiere-ajout.component';

describe('ConfigMatiereAjoutComponent', () => {
  let component: ConfigMatiereAjoutComponent;
  let fixture: ComponentFixture<ConfigMatiereAjoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigMatiereAjoutComponent]
    });
    fixture = TestBed.createComponent(ConfigMatiereAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
