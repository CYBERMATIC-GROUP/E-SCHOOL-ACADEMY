import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisDuTempsEleveComponent } from './emplois-du-temps-eleve.component';

describe('EmploisDuTempsEleveComponent', () => {
  let component: EmploisDuTempsEleveComponent;
  let fixture: ComponentFixture<EmploisDuTempsEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploisDuTempsEleveComponent]
    });
    fixture = TestBed.createComponent(EmploisDuTempsEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
