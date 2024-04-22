import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMatiereComponent } from './config-matiere.component';

describe('ConfigMatiereComponent', () => {
  let component: ConfigMatiereComponent;
  let fixture: ComponentFixture<ConfigMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigMatiereComponent]
    });
    fixture = TestBed.createComponent(ConfigMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
