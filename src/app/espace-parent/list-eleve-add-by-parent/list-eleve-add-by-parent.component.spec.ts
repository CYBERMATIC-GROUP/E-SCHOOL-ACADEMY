import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEleveAddByParentComponent } from './list-eleve-add-by-parent.component';

describe('ListEleveAddByParentComponent', () => {
  let component: ListEleveAddByParentComponent;
  let fixture: ComponentFixture<ListEleveAddByParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEleveAddByParentComponent]
    });
    fixture = TestBed.createComponent(ListEleveAddByParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
