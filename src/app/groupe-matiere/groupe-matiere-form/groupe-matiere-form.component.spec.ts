import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeMatiereFormComponent } from './groupe-matiere-form.component';

describe('GroupeMatiereFormComponent', () => {
  let component: GroupeMatiereFormComponent;
  let fixture: ComponentFixture<GroupeMatiereFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupeMatiereFormComponent]
    });
    fixture = TestBed.createComponent(GroupeMatiereFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
