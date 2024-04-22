import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEleveParentComponent } from './search-eleve-parent.component';

describe('SearchEleveParentComponent', () => {
  let component: SearchEleveParentComponent;
  let fixture: ComponentFixture<SearchEleveParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchEleveParentComponent]
    });
    fixture = TestBed.createComponent(SearchEleveParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
