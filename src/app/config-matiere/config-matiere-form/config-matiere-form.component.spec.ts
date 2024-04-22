import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMatiereFormComponent } from './config-matiere-form.component';

describe('ConfigMatiereFormComponent', () => {
  let component: ConfigMatiereFormComponent;
  let fixture: ComponentFixture<ConfigMatiereFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigMatiereFormComponent]
    });
    fixture = TestBed.createComponent(ConfigMatiereFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
