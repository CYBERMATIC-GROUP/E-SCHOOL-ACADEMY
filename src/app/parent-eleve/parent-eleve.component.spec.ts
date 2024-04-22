import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEleveComponent } from './parent-eleve.component';

describe('ParentEleveComponent', () => {
  let component: ParentEleveComponent;
  let fixture: ComponentFixture<ParentEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentEleveComponent]
    });
    fixture = TestBed.createComponent(ParentEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
