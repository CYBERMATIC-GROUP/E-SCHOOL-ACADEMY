import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalisationDocumentComponent } from './personalisation-document.component';

describe('PersonalisationDocumentComponent', () => {
  let component: PersonalisationDocumentComponent;
  let fixture: ComponentFixture<PersonalisationDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalisationDocumentComponent]
    });
    fixture = TestBed.createComponent(PersonalisationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
