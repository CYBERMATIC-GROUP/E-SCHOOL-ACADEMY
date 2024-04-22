import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiemessageAccueilComponent } from './envoiemessage-accueil.component';

describe('EnvoiemessageAccueilComponent', () => {
  let component: EnvoiemessageAccueilComponent;
  let fixture: ComponentFixture<EnvoiemessageAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvoiemessageAccueilComponent]
    });
    fixture = TestBed.createComponent(EnvoiemessageAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
