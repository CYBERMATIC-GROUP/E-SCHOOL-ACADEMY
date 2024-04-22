import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsFormComponent } from './mentions-form.component';

describe('MentionsFormComponent', () => {
  let component: MentionsFormComponent;
  let fixture: ComponentFixture<MentionsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentionsFormComponent]
    });
    fixture = TestBed.createComponent(MentionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
