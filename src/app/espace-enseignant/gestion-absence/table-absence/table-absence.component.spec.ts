import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAbsenceComponent } from './table-absence.component';

describe('TableAbsenceComponent', () => {
  let component: TableAbsenceComponent;
  let fixture: ComponentFixture<TableAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAbsenceComponent]
    });
    fixture = TestBed.createComponent(TableAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
