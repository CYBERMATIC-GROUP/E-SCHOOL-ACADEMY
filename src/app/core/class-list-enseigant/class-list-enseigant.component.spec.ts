import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListEnseigantComponent } from './class-list-enseigant.component';

describe('ClassListEnseigantComponent', () => {
  let component: ClassListEnseigantComponent;
  let fixture: ComponentFixture<ClassListEnseigantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassListEnseigantComponent]
    });
    fixture = TestBed.createComponent(ClassListEnseigantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
