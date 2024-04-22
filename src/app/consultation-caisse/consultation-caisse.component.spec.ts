import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCaisseComponent } from './consultation-caisse.component';

describe('ConsultationCaisseComponent', () => {
  let component: ConsultationCaisseComponent;
  let fixture: ComponentFixture<ConsultationCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationCaisseComponent]
    });
    fixture = TestBed.createComponent(ConsultationCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
