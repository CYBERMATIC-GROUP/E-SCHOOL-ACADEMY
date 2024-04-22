import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEcheanceComponent } from './info-echeance.component';

describe('InfoEcheanceComponent', () => {
  let component: InfoEcheanceComponent;
  let fixture: ComponentFixture<InfoEcheanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEcheanceComponent]
    });
    fixture = TestBed.createComponent(InfoEcheanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
