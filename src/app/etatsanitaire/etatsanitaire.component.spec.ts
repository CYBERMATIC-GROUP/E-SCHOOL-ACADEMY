import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatsanitaireComponent } from './etatsanitaire.component';

describe('EtatsanitaireComponent', () => {
  let component: EtatsanitaireComponent;
  let fixture: ComponentFixture<EtatsanitaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatsanitaireComponent]
    });
    fixture = TestBed.createComponent(EtatsanitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
