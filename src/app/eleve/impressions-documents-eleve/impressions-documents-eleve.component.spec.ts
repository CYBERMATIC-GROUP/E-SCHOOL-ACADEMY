import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionsDocumentsEleveComponent } from './impressions-documents-eleve.component';

describe('ImpressionsDocumentsEleveComponent', () => {
  let component: ImpressionsDocumentsEleveComponent;
  let fixture: ComponentFixture<ImpressionsDocumentsEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionsDocumentsEleveComponent]
    });
    fixture = TestBed.createComponent(ImpressionsDocumentsEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
