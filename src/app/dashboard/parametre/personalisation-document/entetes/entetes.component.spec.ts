import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetesComponent } from './entetes.component';

describe('EntetesComponent', () => {
  let component: EntetesComponent;
  let fixture: ComponentFixture<EntetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntetesComponent]
    });
    fixture = TestBed.createComponent(EntetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
