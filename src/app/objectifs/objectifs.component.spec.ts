import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifsComponent } from './objectifs.component';

describe('ObjectifsComponent', () => {
  let component: ObjectifsComponent;
  let fixture: ComponentFixture<ObjectifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectifsComponent]
    });
    fixture = TestBed.createComponent(ObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
