import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalisationCertificatComponent } from './personnalisation-certificat.component';

describe('PersonnalisationCertificatComponent', () => {
  let component: PersonnalisationCertificatComponent;
  let fixture: ComponentFixture<PersonnalisationCertificatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnalisationCertificatComponent]
    });
    fixture = TestBed.createComponent(PersonnalisationCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
