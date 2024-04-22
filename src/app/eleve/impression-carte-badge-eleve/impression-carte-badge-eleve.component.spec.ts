import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionCarteBadgeEleveComponent } from './impression-carte-badge-eleve.component';

describe('ImpressionCarteBadgeEleveComponent', () => {
  let component: ImpressionCarteBadgeEleveComponent;
  let fixture: ComponentFixture<ImpressionCarteBadgeEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionCarteBadgeEleveComponent]
    });
    fixture = TestBed.createComponent(ImpressionCarteBadgeEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
