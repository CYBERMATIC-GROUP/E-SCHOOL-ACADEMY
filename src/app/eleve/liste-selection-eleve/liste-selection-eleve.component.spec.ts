import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSelectionEleveComponent } from './liste-selection-eleve.component';

describe('ListeSelectionEleveComponent', () => {
  let component: ListeSelectionEleveComponent;
  let fixture: ComponentFixture<ListeSelectionEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSelectionEleveComponent]
    });
    fixture = TestBed.createComponent(ListeSelectionEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
