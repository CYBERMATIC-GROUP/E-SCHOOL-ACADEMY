import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSaisieExtComponent } from './note-saisie-ext.component';

describe('NoteSaisieExtComponent', () => {
  let component: NoteSaisieExtComponent;
  let fixture: ComponentFixture<NoteSaisieExtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteSaisieExtComponent]
    });
    fixture = TestBed.createComponent(NoteSaisieExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
