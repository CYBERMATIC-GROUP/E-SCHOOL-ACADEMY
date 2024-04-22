import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatsanitaireFormComponent } from './etatsanitaire-form.component';

describe('EtatsanitaireFormComponent', () => {
  let component: EtatsanitaireFormComponent;
  let fixture: ComponentFixture<EtatsanitaireFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatsanitaireFormComponent]
    });
    fixture = TestBed.createComponent(EtatsanitaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
