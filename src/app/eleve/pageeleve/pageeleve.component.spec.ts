import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageeleveComponent } from './pageeleve.component';

describe('PageeleveComponent', () => {
  let component: PageeleveComponent;
  let fixture: ComponentFixture<PageeleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageeleveComponent]
    });
    fixture = TestBed.createComponent(PageeleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
