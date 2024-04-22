import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetionsComponent } from './mentions.component';

describe('MetionsComponent', () => {
  let component: MetionsComponent;
  let fixture: ComponentFixture<MetionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetionsComponent]
    });
    fixture = TestBed.createComponent(MetionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
