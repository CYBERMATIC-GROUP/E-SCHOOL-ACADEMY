import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnaliserImageComponent } from './personnaliser-image.component';

describe('PersonnaliserImageComponent', () => {
  let component: PersonnaliserImageComponent;
  let fixture: ComponentFixture<PersonnaliserImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnaliserImageComponent]
    });
    fixture = TestBed.createComponent(PersonnaliserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
