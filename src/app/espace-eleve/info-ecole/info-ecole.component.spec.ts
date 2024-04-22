import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEcoleComponent } from './info-ecole.component';

describe('InfoEcoleComponent', () => {
  let component: InfoEcoleComponent;
  let fixture: ComponentFixture<InfoEcoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEcoleComponent]
    });
    fixture = TestBed.createComponent(InfoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
