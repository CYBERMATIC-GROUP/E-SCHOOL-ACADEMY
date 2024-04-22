import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoieMailComponent } from './envoie-mail.component';

describe('EnvoieMailComponent', () => {
  let component: EnvoieMailComponent;
  let fixture: ComponentFixture<EnvoieMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvoieMailComponent]
    });
    fixture = TestBed.createComponent(EnvoieMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
