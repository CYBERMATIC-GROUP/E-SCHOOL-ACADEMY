import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseFiltreComponent } from './classe-filtre.component';

describe('ClasseFiltreComponent', () => {
  let component: ClasseFiltreComponent;
  let fixture: ComponentFixture<ClasseFiltreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseFiltreComponent]
    });
    fixture = TestBed.createComponent(ClasseFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
