import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesalleComponent } from './typesalle.component';

describe('TypesalleComponent', () => {
  let component: TypesalleComponent;
  let fixture: ComponentFixture<TypesalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesalleComponent]
    });
    fixture = TestBed.createComponent(TypesalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
