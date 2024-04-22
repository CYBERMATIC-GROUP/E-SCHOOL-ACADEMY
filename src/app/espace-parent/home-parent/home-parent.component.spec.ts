import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeParentComponent } from './home-parent.component';

describe('HomeParentComponent', () => {
  let component: HomeParentComponent;
  let fixture: ComponentFixture<HomeParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeParentComponent]
    });
    fixture = TestBed.createComponent(HomeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
